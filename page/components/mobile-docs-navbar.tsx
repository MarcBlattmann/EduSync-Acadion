'use client';

import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocsTree, DocItem } from '@/components/docs-tree';

interface MobileDocsNavbarProps {
    tree: DocItem[];
    selectedFile: string;
    expandedFolders: Set<string>;
    onSelectFile: (path: string) => void;
    onToggleFolder: (path: string) => void;
    onClose: () => void;
    isOpen: boolean;
}

export function MobileDocsNavbar({
    tree,
    selectedFile,
    expandedFolders,
    onSelectFile,
    onToggleFolder,
    onClose,
    isOpen,
}: MobileDocsNavbarProps) {
    const handleSelectFile = (path: string) => {
        onSelectFile(path);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 md:hidden bg-background">
            <div className="flex flex-col pt-10 h-full">
                {/* Header - Same as outside */}
                <div className="md:hidden flex items-center gap-2 pt-3 px-3 border-b">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h2 className="text-sm ml-[-5px] font-medium truncate flex-1">Documentation</h2>
                </div>

                {/* Navigation Tree */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <DocsTree
                        tree={tree}
                        selectedFile={selectedFile}
                        expandedFolders={expandedFolders}
                        onSelectFile={handleSelectFile}
                        onToggleFolder={onToggleFolder}
                    />
                </div>
            </div>
        </div>
    );
}

export function MobileDocsMenuButton({ onClick }: { onClick: () => void }) {
    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClick}
            className="md:hidden cursor-pointer p-0"
        >
            <Menu className="ml-[-5px] h-5 w-2" />
        </Button>
    );
}
