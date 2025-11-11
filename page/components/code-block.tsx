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

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return <code className={className}>{children}</code>;
    }

    return (
        <div className="relative group inline-flex items-center w-full">
            <pre className={`${className} py-0! px-2! m-0! leading-none`}>
                <code className="leading-none">{code}</code>
            </pre>
            <Button
                onClick={handleCopy}
                size="icon"
                variant="ghost"
                className="absolute cursor-pointer right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
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
