'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function CodeBlock({ inline, className, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState<string>('');
    const code = String(children).replace(/\n$/, '');
    const isMultiLine = code.includes('\n');
    const language = className?.replace('language-', '') || 'text';

    useEffect(() => {
        if (isMultiLine) {
            codeToHtml(code, {
                lang: language,
                theme: 'github-dark',
            }).then((html) => {
                const cleaned = html
                    .replace(/<pre[^>]*>/g, '')
                    .replace(/<\/pre>/g, '')
                    .replace(/<code[^>]*>/g, '')
                    .replace(/<\/code>/g, '');
                setHighlightedCode(cleaned);
            }).catch(() => setHighlightedCode(''));
        }
    }, [code, language, isMultiLine]);

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
                {highlightedCode ? (
                    <pre className="py-3 px-4 m-0 leading-none overflow-x-auto overflow-y-hidden">
                        <code 
                            className="leading-none"
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        />
                    </pre>
                ) : (
                    <pre className={`${className} py-3 px-4 m-0! leading-none overflow-x-auto overflow-y-hidden`}>
                        <code className="leading-none">{code}</code>
                    </pre>
                )}
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
            {highlightedCode ? (
                <pre className="py-3 px-4 m-0 leading-none overflow-x-auto overflow-y-hidden">
                    <code 
                        className="leading-none"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            ) : (
                <pre className={`${className} py-3 px-4 m-0! leading-none overflow-x-auto overflow-y-hidden`}>
                    <code className="leading-none">{code}</code>
                </pre>
            )}
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
