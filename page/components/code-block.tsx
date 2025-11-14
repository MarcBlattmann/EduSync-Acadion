'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function CodeBlock({ inline, className, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const code = String(children).replace(/\n$/, '');
    const isMultiLine = code.includes('\n');

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return <code className={className}>{children}</code>;
    }

    if (isMultiLine) {
        return (
            <div className="relative group w-full">
                <pre className={`${className} py-3 px-4 m-0! leading-none overflow-x-auto overflow-y-hidden`}>
                    <code className="leading-none">{code}</code>
                </pre>
                <Button
                    onClick={handleCopy}
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 cursor-pointer right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Code kopieren"
                >
                    {copied ? (
                        <Check size={14} className="text-green-500" />
                    ) : (
                        <Copy size={14} />
                    )}
                </Button>
            </div>
        );
    }

    return (
        <div className="relative group w-full">
            <pre className={`${className} py-3 px-4 m-0! leading-none overflow-x-auto overflow-y-hidden`}>
                <code className="leading-none">{code}</code>
            </pre>
            <Button
                onClick={handleCopy}
                size="icon"
                variant="ghost"
                className="absolute top-2 cursor-pointer right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Code kopieren"
            >
                {copied ? (
                    <Check size={14} className="text-green-500" />
                ) : (
                    <Copy size={14} />
                )}
            </Button>
        </div>
    );
}
