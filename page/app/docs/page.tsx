'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar"
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/code-block';
import { MarkdownLink } from '@/components/markdown-link';
import { DocsTree, DocItem, findFirstFile } from '@/components/docs-tree';

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export default function DocsPage() {
    const [tree, setTree] = useState<DocItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const parseFrontmatter = (text: string) => {
        const match = text.match(FRONTMATTER_REGEX);
        if (!match) return { metadata: null, content: text };

        const frontmatter = match[1];
        const markdownContent = match[2];

        const iconMatch = frontmatter.match(/icon:\s*(\w+)/);
        const orderMatch = frontmatter.match(/order:\s*(\d+\.?\d*)/);

        return {
            content: markdownContent,
            metadata: {
                icon: iconMatch ? iconMatch[1] : '',
                order: orderMatch ? parseFloat(orderMatch[1]) : Infinity,
            }
        };
    };

    useEffect(() => {
        fetch('/api/docs')
            .then(res => res.json())
            .then(data => {
                const docTree = (data.tree || []) as DocItem[];
                setTree(docTree);

                const firstFile = findFirstFile(docTree, (folderPath) => {
                    setExpandedFolders(prev => new Set(prev).add(folderPath));
                });

                if (firstFile) {
                    setSelectedFile(firstFile);
                }
            })
            .catch(err => console.error('Failed to fetch docs:', err));
    }, []);

    useEffect(() => {
        if (!selectedFile) return;

        fetch(`/docs/${selectedFile}.md`)
            .then(res => res.text())
            .then(text => {
                const { content: markdownContent } = parseFrontmatter(text);
                setContent(markdownContent);
            })
            .catch(err => console.error('Failed to fetch content:', err));
    }, [selectedFile]);

    const handleToggleFolder = (path: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    };

    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col">
                <div className="pt-10 px-3">
                    <div className="space-y-4 flex gap-5">
                        {/* Sidebar */}
                        <DocsTree
                            tree={tree}
                            selectedFile={selectedFile}
                            expandedFolders={expandedFolders}
                            onSelectFile={setSelectedFile}
                            onToggleFolder={handleToggleFolder}
                        />

                        {/* Content */}
                        <div className="flex-1 prose dark:prose-invert max-w-none">
                            <ReactMarkdown components={{ code: CodeBlock, a: MarkdownLink }}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}