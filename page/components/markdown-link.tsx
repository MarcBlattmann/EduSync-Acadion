'use client';

import { LinkPreview } from '@/components/ui/link-preview';
import { useState } from 'react';

interface MarkdownLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function MarkdownLink({ href, children }: MarkdownLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!href) return <a>{children}</a>;

  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );

  if (isLocalhost) {
    return (
      <span 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="underline cursor-pointer relative inline-block"
      >
        {children}
        {isHovered && (
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap text-xs bg-gray-700 dark:bg-gray-300 text-white dark:text-black px-2 py-1 rounded pointer-events-none">
            Preview not available on local
          </span>
        )}
      </span>
    );
  }

  return (
    <LinkPreview url={href} className="text-blue-600 dark:text-blue-400 hover:underline">
      {children}
    </LinkPreview>
  );
}
