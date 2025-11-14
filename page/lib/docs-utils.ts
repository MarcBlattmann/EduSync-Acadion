export const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export const parseOptions = (text: string) => {
    const codeBlockMatch = text.match(/```[\s\S]*?```/);
    if (codeBlockMatch) {
        const codeBlock = codeBlockMatch[0];
        const optionRegex = /\?/;
        if (optionRegex.test(codeBlock)) {
            return text.replace(codeBlockMatch[0], '<OPTION_SELECTOR/>');
        }
    }
    return text;
};

export const parseFrontmatter = (text: string) => {
    const match = text.match(FRONTMATTER_REGEX);
    if (!match) return { metadata: null, content: text };

    const frontmatter = match[1];
    const markdownContent = match[2];

    const iconMatch = frontmatter.match(/icon:\s*(\w+)/);
    const orderMatch = frontmatter.match(/order:\s*(\d+\.?\d*)/);

    return {
        content: markdownContent,
        metadata: {
            icon: iconMatch ? iconMatch[1] : '',
            order: orderMatch ? parseFloat(orderMatch[1]) : Infinity,
        }
    };
};
