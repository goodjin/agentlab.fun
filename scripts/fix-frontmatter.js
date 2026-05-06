#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dirs = ['src/blog', 'src/insights'];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Extract existing front matter
        const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
        if (!frontMatterMatch) return;

        const frontMatter = frontMatterMatch[1];
        const bodyContent = content.slice(frontMatterMatch[0].length);

        // Parse existing front matter
        const lines = frontMatter.split('\n');
        const data = {};
        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.slice(0, colonIndex).trim();
                let value = line.slice(colonIndex + 1).trim();
                // Remove quotes if present
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                data[key] = value;
            }
        });

        // Determine layout
        const layout = dir === 'src/blog' ? 'article.njk' : 'article.njk';

        // Determine permalink
        const permalink = dir === 'src/blog'
            ? `/blog/${file}`
            : `/insights/${file}`;

        // Extract title from body if not in front matter
        let title = data.title || '';
        if (!title) {
            const h1Match = bodyContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
            if (h1Match) {
                title = h1Match[1].trim();
            }
        }

        // Escape title
        const escapedTitle = title.replace(/"/g, '\\"');

        // Build new front matter
        const newFrontMatter = `---
layout: ${layout}
title: "${escapedTitle}"
date: "${data.date || ''}"
tags: [${dir === 'src/blog' ? 'blog' : 'insights'}]
permalink: ${permalink}
---\n`;

        const newContent = newFrontMatter + bodyContent;
        fs.writeFileSync(filePath, newContent);

        console.log(`Fixed: ${file}`);
    });
});

console.log('\nDone fixing front matter!');