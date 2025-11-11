'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar"
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/code-block';
import * as Icons from 'lucide-react';

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export default function DocsPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [fileIcons, setFileIcons] = useState<Record<string, string>>({});
    const [fileOrder, setFileOrder] = useState<Record<string, number>>({});

    const parseFrontmatter = (text: string) => {
        const match = text.match(FRONTMATTER_REGEX);
        if (!match) return { metadata: null, content: text };

        const frontmatter = match[1];
        const markdownContent = match[2];

        const iconMatch = frontmatter.match(/icon:\s*(\w+)/);
        const orderMatch = frontmatter.match(/order:\s*(\d+\.?\d*)/);
        const titleMatch = frontmatter.match(/title:\s*(.+)/);

        return {
            content: markdownContent,
            metadata: {
                icon: iconMatch ? iconMatch[1] : '',
                order: orderMatch ? parseFloat(orderMatch[1]) : Infinity,
                title: titleMatch ? titleMatch[1].trim() : '',
            }
        };
    };

    useEffect(() => {
        fetch('/api/docs')
            .then(res => res.json())
            .then(data => {
                const docFiles = (data.files || []) as string[];
                setFiles(docFiles);

                if (docFiles.length === 0) return;

                Promise.all(
                    docFiles.map(file =>
                        fetch(`/docs/${file}`)
                            .then(res => res.text())
                            .then(text => ({ file, ...parseFrontmatter(text) }))
                    )
                ).then(results => {
                    const fileWithLowestOrder = results.reduce((lowest, current) => {
                        const currentOrder = current.metadata?.order ?? Infinity;
                        const lowestOrder = lowest.metadata?.order ?? Infinity;
                        return currentOrder < lowestOrder ? current : lowest;
                    });

                    setSelectedFile(fileWithLowestOrder.file);
                }).catch(err => console.error('Failed to fetch docs:', err));
            })
            .catch(err => console.error('Failed to fetch docs list:', err));
    }, []);

    useEffect(() => {
        if (!selectedFile) return;

        fetch(`/docs/${selectedFile}`)
            .then(res => res.text())
            .then(text => {
                const { content: markdownContent, metadata } = parseFrontmatter(text);

                setContent(markdownContent);
                if (metadata) {
                    setFileIcons(prev => ({ ...prev, [selectedFile]: metadata.icon }));
                    setFileOrder(prev => ({ ...prev, [selectedFile]: metadata.order }));
                }
            })
            .catch(err => {
                console.error('Failed to fetch content:', err);
            });
    }, [selectedFile]);

    const getIconComponent = (name: string) => {
        if (!name) return null;

        const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<any>;
        return IconComponent ? <IconComponent size={20} /> : null;
    };

    const sortedFiles = files
        .map(file => ({ file, order: fileOrder[file] ?? Infinity }))
        .sort((a, b) => a.order - b.order);

    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col">
                <div className="pt-10 px-3">
                    <div className="space-y-4 flex gap-5">
                        {/* Sidebar */}
                        <div className="w-1/4 flex flex-col gap-2">
                            {sortedFiles.map(({ file }) => (
                                <button
                                    key={file}
                                    onClick={() => setSelectedFile(file)}
                                    className={`py-2 cursor-pointer items-center flex gap-2 px-3 rounded-lg transition-colors ${
                                        selectedFile === file
                                            ? 'text-foreground dark:bg-[#171717] bg-[#fafafa]'
                                            : 'text-muted-foreground hover:text-foreground hover:dark:bg-[#171717] hover:bg-[#fafafa]'
                                    }`}
                                >
                                    {fileIcons[file] && (
                                        <div className="shrink-0">
                                            {getIconComponent(fileIcons[file])}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{file.replace('.md', '')}</span>
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 prose dark:prose-invert max-w-none">
                            <ReactMarkdown components={{ code: CodeBlock }}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}