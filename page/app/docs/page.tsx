'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar"
import ReactMarkdown from 'react-markdown';
import { Spinner } from '@/components/ui/spinner';

export default function DocsPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('Welcome.md');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(false);

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
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch content:', err);
                    setLoading(false);
                });
        }
    }, [selectedFile]);

    return (
        <>
            <Navbar />
            <div className="flex px-4">
                <div className="w-1/4 flex flex-col">
                    {files.map((file) => (
                        <button
                            key={file}
                            onClick={() => setSelectedFile(file)}
                            className='w-fit py-2 cursor-pointer'
                        >
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