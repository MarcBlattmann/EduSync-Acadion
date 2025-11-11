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

/**
 * Get the lucide-react icon component by name
 * @param name - Icon name (must be PascalCase, e.g., "Hand", "Hammer")
 * @returns React component or null if not found
 */
export const getIconComponent = (name: string) => {
    if (!name) return null;

    const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
    return IconComponent ? <IconComponent size={20} /> : null;
};

/**
 * Recursively find the first file in a doc tree
 * @param items - Array of doc items to search
 * @param onFolderFound - Callback when a folder containing the file is found
 * @returns Path to the first file found, or null
 */
export const findFirstFile = (
    items: DocItem[],
    onFolderFound?: (path: string) => void
): string | null => {
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

/**
 * Folder item with expand/collapse chevron
 */
const FolderItem = ({
    item,
    level = 0,
    isExpanded,
    onToggle,
}: {
    item: DocItem;
    level: number;
    isExpanded: boolean;
    onToggle: () => void;
}) => (
    <button
        onClick={onToggle}
        className="cursor-pointer w-full py-2 px-3 rounded-lg transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground hover:dark:bg-[#171717] hover:bg-[#fafafa]"
        style={{ paddingLeft: `${12 + level * 12}px` }}
        aria-expanded={isExpanded}
    >
        <ChevronRight
            size={16}
            className={`shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
        <span className="text-sm font-medium">{item.name}</span>
    </button>
);

/**
 * File item with icon and selection state
 */
const FileItem = ({
    item,
    level = 0,
    isSelected,
    onSelect,
}: {
    item: DocItem;
    level: number;
    isSelected: boolean;
    onSelect: () => void;
}) => (
    <button
        onClick={onSelect}
        className={`w-full cursor-pointer py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${
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

/**
 * Main tree item - renders either a folder or file based on item type
 */
const DocTreeItem = ({
    item,
    level = 0,
    selectedFile,
    expandedFolders,
    onSelectFile,
    onToggleFolder,
}: DocTreeItemProps) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expandedFolders.has(item.path);
    const isSelected = selectedFile === item.path;

    return (
        <div key={item.path} className='mt-1'>
            {isFolder ? (
                <>
                    <FolderItem
                        item={item}
                        level={level}
                        isExpanded={isExpanded}
                        onToggle={() => onToggleFolder(item.path)}
                    />
                    {isExpanded && item.children && (
                        <div className="ml-5">
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
                </>
            ) : (
                <FileItem
                    item={item}
                    level={level}
                    isSelected={isSelected}
                    onSelect={() => onSelectFile(item.path)}
                />
            )}
        </div>
    );
};

interface DocsTreeProps {
    tree: DocItem[];
    selectedFile: string;
    expandedFolders: Set<string>;
    onSelectFile: (path: string) => void;
    onToggleFolder: (path: string) => void;
}

/**
 * Main docs tree sidebar component
 * Renders the complete navigation tree for all docs
 */
export const DocsTree = ({
    tree,
    selectedFile,
    expandedFolders,
    onSelectFile,
    onToggleFolder,
}: DocsTreeProps) => {
    return (
        <div className="w-1/4 flex flex-col">
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
