#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const insightsDir = 'insights';
const srcInsightsDir = 'src/insights';

if (!fs.existsSync(srcInsightsDir)) {
    fs.mkdirSync(srcInsightsDir, { recursive: true });
}

const files = fs.readdirSync(insightsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const srcPath = path.join(insightsDir, file);
    const content = fs.readFileSync(srcPath, 'utf-8');

    const titleMatch = content.match(/<title>([^<]+)/);
    const title = titleMatch ? titleMatch[1].replace(' - 洞察', '').trim() : file.replace('.html', '');

    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    let bodyContent = bodyMatch ? bodyMatch[1].trim() : content;

    bodyContent = bodyContent.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    bodyContent = bodyContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

    const escapedTitle = title
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ');
    const permalink = `/insights/${file}`;
    const frontMatter = `---
layout: article.njk
title: "${escapedTitle}"
tags: [insights]
permalink: ${permalink}
---\n`;

    const output = frontMatter + '\n' + bodyContent;
    const outputFile = path.join(srcInsightsDir, file);
    fs.writeFileSync(outputFile, output);

    console.log(`Migrated: ${file}`);
});

console.log(`\nMigrated ${files.length} insight files to src/insights/`);