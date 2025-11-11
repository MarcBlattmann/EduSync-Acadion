import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

interface DocMetadata {
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

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

/**
 * Parse YAML frontmatter from markdown content
 * Format:
 * ---
 * icon: IconName
 * order: 1
 * ---
 */
function parseFrontmatter(text: string): { metadata: DocMetadata | null } {
  const match = text.match(FRONTMATTER_REGEX);
  if (!match) {
    return { metadata: null };
  }

  const frontmatter = match[1];

  const iconMatch = frontmatter.match(/icon:\s*(\w+)/);
  const orderMatch = frontmatter.match(/order:\s*(\d+\.?\d*)/);

  return {
    metadata: {
      icon: iconMatch ? iconMatch[1] : '',
      order: orderMatch ? parseFloat(orderMatch[1]) : Infinity,
    }
  };
}

function buildDocTree(basePath: string, currentPath: string = ''): DocItem[] {
  const fullPath = join(basePath, currentPath);
  const items = readdirSync(fullPath);
  const docItems: DocItem[] = [];

  for (const item of items) {
    if (item.startsWith('.')) {
      continue;
    }

    const itemPath = join(fullPath, item);
    const stat = statSync(itemPath);
    const relativePath = currentPath ? `${currentPath}/${item}` : item;

    if (stat.isDirectory()) {
      const children = buildDocTree(basePath, relativePath);
      if (children.length > 0) {
        docItems.push({
          name: item,
          type: 'folder',
          path: relativePath,
          children,
        });
      }
    } else if (item.endsWith('.md')) {
      const filePath = join(fullPath, item);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const { metadata } = parseFrontmatter(content);

        docItems.push({
          name: item.replace('.md', ''),
          type: 'file',
          path: relativePath.replace('.md', ''),
          ...(metadata && { metadata }),
        });
      } catch {
        docItems.push({
          name: item.replace('.md', ''),
          type: 'file',
          path: relativePath.replace('.md', ''),
        });
      }
    }
  }

  // Sort items by order, then alphabetically
  return docItems.sort((a, b) => {
    const orderA = a.metadata?.order ?? Infinity;
    const orderB = b.metadata?.order ?? Infinity;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.name.localeCompare(b.name);
  });
}

export async function GET() {
  try {
    const docsPath = join(process.cwd(), 'public', 'docs');
    const tree = buildDocTree(docsPath);

    return Response.json({ tree });
  } catch {
    return Response.json(
      { error: 'Failed to read docs' },
      { status: 500 }
    );
  }
}
