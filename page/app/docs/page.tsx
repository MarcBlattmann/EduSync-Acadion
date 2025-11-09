'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar"
import ReactMarkdown from 'react-markdown';
import { Spinner } from '@/components/ui/spinner';
import * as Icons from 'lucide-react';

export default function DocsPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('Welcome.md');
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [fileIcons, setFileIcons] = useState<Record<string, string>>({});
    const [fileOrder, setFileOrder] = useState<Record<string, number>>({});

    useEffect(() => {
        fetch('/api/docs')
            .then(res => res.json())
            .then(data => {
                setFiles(data.files || []);
                if (data.files && data.files.length > 0) {
                    setSelectedFile(data.files[0]);
                }
            })
            .catch(err => console.error('Failed to fetch docs:', err));
    }, []);

    useEffect(() => {
        if (selectedFile) {
            setLoading(true);
            fetch(`/docs/${selectedFile}`)
                .then(res => res.text())
                .then(text => {
                    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
                    const match = text.match(frontmatterRegex);
                    
                    if (match) {
                        const frontmatter = match[1];
                        const content = match[2];
                        
                        const iconMatch = frontmatter.match(/icon:\s*(\w+)/);
                        const icon = iconMatch ? iconMatch[1] : '';
                        const orderMatch = frontmatter.match(/order:\s*(\d+\.?\d*)/);
                        const order = orderMatch ? parseFloat(orderMatch[1]) : Infinity;
                        const titleMatch = frontmatter.match(/title:\s*(.+)/);
                        const docTitle = titleMatch ? titleMatch[1].trim() : selectedFile.replace('.md', '');
                        
                        setFileIcons(prev => ({ ...prev, [selectedFile]: icon }));
                        setFileOrder(prev => ({ ...prev, [selectedFile]: order }));
                        setTitle(docTitle);
                        setContent(content);
                    } else {
                        setFileIcons(prev => ({ ...prev, [selectedFile]: '' }));
                        setFileOrder(prev => ({ ...prev, [selectedFile]: Infinity }));
                        setTitle(selectedFile.replace('.md', ''));
                        setContent(text);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch content:', err);
                    setLoading(false);
                });
        }
    }, [selectedFile]);

    const getIconComponent = (name: string) => {
        if (!name) return null;
        const Icon = Icons[name as keyof typeof Icons] as any;
        return Icon ? <Icon size={20} /> : null;
    };

    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col">
                <div className="pt-10 px-3">
                    <div className="space-y-4 flex gap-5">
                        <div className="w-1/4 flex flex-col gap-2">
                            {files
                                .map(file => ({ file, order: fileOrder[file] ?? Infinity }))
                                .sort((a, b) => a.order - b.order)
                                .map(({ file }) => (
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
                        <div className="flex-1 prose dark:prose-invert max-w-none">
                            {loading ? null : (
                                <>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}