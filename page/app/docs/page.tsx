'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DocItem, findFirstFile } from '@/components/docs-tree';

export default function DocsPage() {
    const router = useRouter();

    useEffect(() => {
        fetch('/api/docs')
            .then(res => res.json())
            .then(data => {
                const docTree = (data.tree || []) as DocItem[];
                const firstFile = findFirstFile(docTree);

                if (firstFile) {
                    router.replace(`/docs/${firstFile}`);
                } else {
                    router.replace('/');
                }
            })
            .catch(err => {
                console.error('Failed to fetch docs:', err);
                router.replace('/');
            });
    }, [router]);

    return null;
}