import { readdirSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const docsPath = join(process.cwd(), 'public', 'docs');
    const files = readdirSync(docsPath)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    return Response.json({ files });
  } catch (error) {
    return Response.json({ error: 'Failed to read docs' }, { status: 500 });
  }
}
