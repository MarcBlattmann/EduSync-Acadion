'use client';

import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

export interface DocMetadata {
    icon: string;
    order: number;
}

export interface DocItem {
    name: string;
    type: 'file' | 'folder';
    path: string;
    children?: DocItem[];
    metadata?: DocMetadata;
}

export const getIconComponent = (name: string) => {
    if (!name) return null;
    const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
    return IconComponent ? <IconComponent size={20} /> : null;
};

export const findFirstFile = (items: DocItem[], onFolderFound?: (path: string) => void): string | null => {
    for (const item of items) {
        if (item.type === 'file') {
            return item.path;
        }
        if (item.type === 'folder' && item.children) {
            const found = findFirstFile(item.children);
            if (found) {
                onFolderFound?.(item.path);
                return found;
            }
        }
    }
    return null;
};

interface DocTreeItemProps {
    item: DocItem;
    level?: number;
    selectedFile: string;
    expandedFolders: Set<string>;
    onSelectFile: (path: string) => void;
    onToggleFolder: (path: string) => void;
}

const DocTreeItem = ({
    item,
    level = 0,
    selectedFile,
    expandedFolders,
    onSelectFile,
    onToggleFolder,
}: DocTreeItemProps) => {
    if (item.type === 'folder') {
        const isExpanded = expandedFolders.has(item.path);

        return (
            <div key={item.path}>
                <button
                    onClick={() => onToggleFolder(item.path)}
                    className="w-full py-2 px-3 rounded-lg transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground hover:dark:bg-[#171717] hover:bg-[#fafafa]"
                    style={{ paddingLeft: `${12 + level * 12}px` }}
                    aria-expanded={isExpanded}
                >
                    <ChevronRight
                        size={16}
                        className={`shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                </button>

                {isExpanded && item.children && (
                    <div className='mt-1 ml-5'>
                        {item.children.map(child => (
                            <DocTreeItem
                                key={child.path}
                                item={child}
                                level={level + 1}
                                selectedFile={selectedFile}
                                expandedFolders={expandedFolders}
                                onSelectFile={onSelectFile}
                                onToggleFolder={onToggleFolder}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const isSelected = selectedFile === item.path;
    return (
        <button
            key={item.path}
            onClick={() => onSelectFile(item.path)}
            className={`w-full py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${
                isSelected
                    ? 'text-foreground dark:bg-[#171717] bg-[#fafafa]'
                    : 'text-muted-foreground hover:text-foreground hover:dark:bg-[#171717] hover:bg-[#fafafa]'
            }`}
            style={{ paddingLeft: `${12 + level * 12}px` }}
        >
            {item.metadata?.icon && (
                <div className="shrink-0">
                    {getIconComponent(item.metadata.icon)}
                </div>
            )}
            <span className="text-sm font-medium">{item.name}</span>
        </button>
    );
};

interface DocsTreeProps {
    tree: DocItem[];
    selectedFile: string;
    expandedFolders: Set<string>;
    onSelectFile: (path: string) => void;
    onToggleFolder: (path: string) => void;
}

export const DocsTree = ({
    tree,
    selectedFile,
    expandedFolders,
    onSelectFile,
    onToggleFolder,
}: DocsTreeProps) => {
    return (
        <div className="w-1/4 flex flex-col gap-1">
            {tree.map(item => (
                <DocTreeItem
                    key={item.path}
                    item={item}
                    selectedFile={selectedFile}
                    expandedFolders={expandedFolders}
                    onSelectFile={onSelectFile}
                    onToggleFolder={onToggleFolder}
                />
            ))}
        </div>
    );
};
