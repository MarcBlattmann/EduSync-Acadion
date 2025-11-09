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
    const [loading, setLoading] = useState(false);
    const [fileIcons, setFileIcons] = useState<Record<string, string>>({});

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
                        setFileIcons(prev => ({ ...prev, [selectedFile]: icon }));
                        setContent(content);
                    } else {
                        setFileIcons(prev => ({ ...prev, [selectedFile]: '' }));
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
            <div className="flex px-4">
                <div className="w-1/4 flex flex-col">
                    {files.map((file) => (
                        <button
                            key={file}
                            onClick={() => setSelectedFile(file)}
                            className='w-fit py-2 cursor-pointer flex gap-2'
                        >
                            {fileIcons[file] && (
                                <div className="shrink-0">
                                    {getIconComponent(fileIcons[file])}
                                </div>
                            )}
                            {file.replace('.md', '')}
                        </button>
                    ))}
                </div>
                <div className="w-3/4">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    )}
                </div>
            </div>
        </>
    );
}