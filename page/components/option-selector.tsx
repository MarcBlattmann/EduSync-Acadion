'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/code-block';

interface Option {
  id: string;
  content: string;
}

export function OptionSelector({ content }: { content: string }) {
  const [selected, setSelected] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [language, setLanguage] = useState<string>('');

  useEffect(() => {
    const codeBlockMatch = content.match(/```[\s\S]*?```/);
    if (!codeBlockMatch) {
      console.log('No code block found in content');
      return;
    }

    const codeBlock = codeBlockMatch[0];
    const lines = codeBlock.split('\n');
    const parsed: Option[] = [];
    
    const firstLine = lines[0];
    const langMatch = firstLine.match(/```(\w+)/);
    if (langMatch) {
      setLanguage(langMatch[1]);
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('?')) {
        const id = line.substring(1);
        const contentLines: string[] = [];
        
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('?') && !lines[j].includes('```')) {
          if (lines[j].trim()) {
            contentLines.push(lines[j].trim());
          }
          j++;
        }

        if (contentLines.length > 0) {
          parsed.push({
            id,
            content: contentLines.join('\n')
          });
        }
      }
    }

    console.log('Parsed options:', parsed);
    setOptions(parsed);
    if (parsed.length > 0) {
      setSelected(parsed[0].id);
    }
  }, [content]);

  const selectedOption = options.find(o => o.id === selected);
  const codeBlockClassName = language ? `language-${language}` : '';

  if (options.length < 2) {
    return selectedOption ? <CodeBlock className={codeBlockClassName}>{selectedOption.content}</CodeBlock> : null;
  }

  return (
    <div className="space-y-4 my-6">
      <div className="flex gap-2 flex-wrap">
        {options.map(option => (
          <Button
            key={option.id}
            variant={selected === option.id ? 'default' : 'outline'}
            onClick={() => setSelected(option.id)}
            className={`border-0 cursor-pointer`}
          >
            {option.id}
          </Button>
        ))}
      </div>
      {selectedOption && (
        <div className="text-base">
          <CodeBlock className={codeBlockClassName}>{selectedOption.content}</CodeBlock>
        </div>
      )}
    </div>
  );
}
