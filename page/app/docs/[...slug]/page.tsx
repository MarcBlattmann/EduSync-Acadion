'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from '@/components/code-block';
import { MarkdownLink } from '@/components/markdown-link';
import { DocsTree, DocItem } from '@/components/docs-tree';
import { OptionSelector } from '@/components/option-selector';
import { parseOptions, parseFrontmatter } from '@/lib/docs-utils';

let cachedTree: DocItem[] | null = null;
let treePromise: Promise<DocItem[]> | null = null;

function fetchDocsTree(): Promise<DocItem[]> {
    if (cachedTree) return Promise.resolve(cachedTree);
    if (treePromise) return treePromise;

    treePromise = fetch('/api/docs')
        .then(res => res.json())
        .then(data => {
            cachedTree = data.tree || [];
            return cachedTree as DocItem[];
        })
        .catch(err => {
            console.error('Failed to fetch docs:', err);
            return [] as DocItem[];
        });

    return treePromise;
}

export default function DocPage() {
    const router = useRouter();
    const params = useParams();
    const [tree, setTree] = useState<DocItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [originalContent, setOriginalContent] = useState<string>('');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchDocsTree()
            .then(docTree => {
                setTree(docTree);

                const slug = params.slug as string[];
                if (slug && slug.length > 0) {
                    const filePath = slug.map(s => decodeURIComponent(s)).join('/');
                    setSelectedFile(filePath);
                    
                    const expandFolders = (items: DocItem[], targetPath: string) => {
                        for (const item of items) {
                            if (targetPath.startsWith(item.path + '/')) {
                                setExpandedFolders(prev => new Set(prev).add(item.path));
                            }
                            if (item.children) {
                                expandFolders(item.children, targetPath);
                            }
                        }
                    };
                    expandFolders(docTree, filePath);
                }
            })
            .catch(err => console.error('Failed to fetch docs:', err));
    }, [params.slug]);

    useEffect(() => {
        if (!selectedFile) return;

        fetch(`/docs/${selectedFile}.md`)
            .then(res => res.text())
            .then(text => {
                const { content: markdownContent } = parseFrontmatter(text);
                const processedContent = parseOptions(markdownContent);
                setOriginalContent(markdownContent);
                setContent(processedContent);
            })
            .catch(err => console.error('Failed to fetch content:', err));
    }, [selectedFile]);

    const handleToggleFolder = useCallback((path: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    }, []);

    const handleSelectFile = useCallback((path: string) => {
        setSelectedFile(path);
        const encodedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
        router.push(`/docs/${encodedPath}`);
    }, [router]);

    const markdownParts = useMemo(() => {
        if (!content.includes('<OPTION_SELECTOR/>')) {
            return null;
        }
        return content.split('<OPTION_SELECTOR/>');
    }, [content]);

    return (
        <div className="h-full flex flex-col">
            <div className="pt-10 px-3">
                <div className="space-y-4 flex gap-5">
                    {/* Sidebar */}
                    <DocsTree
                        tree={tree}
                        selectedFile={selectedFile}
                        expandedFolders={expandedFolders}
                        onSelectFile={handleSelectFile}
                        onToggleFolder={handleToggleFolder}
                    />

                    {/* Content */}
                    <div className="flex-1 prose dark:prose-invert max-w-none">
                        {markdownParts ? (
                            <>
                                {markdownParts.map((part, idx) => (
                                    <div key={idx}>
                                        <ReactMarkdown 
                                            components={{
                                                code: CodeBlock,
                                                a: MarkdownLink,
                                            }}
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                        >
                                            {part}
                                        </ReactMarkdown>
                                        {idx < markdownParts.length - 1 && (
                                            <OptionSelector content={originalContent} />
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <ReactMarkdown 
                                components={{
                                    code: CodeBlock,
                                    a: MarkdownLink,
                                }}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
