#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read blog posts from www/blog/
const blogDir = 'blog';
const srcBlogDir = 'src/blog';

// Ensure src/blog exists
if (!fs.existsSync(srcBlogDir)) {
    fs.mkdirSync(srcBlogDir, { recursive: true });
}

// Get all HTML files in www/blog/
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const srcPath = path.join(blogDir, file);
    const content = fs.readFileSync(srcPath, 'utf-8');

    // Extract title
    const titleMatch = content.match(/<title>([^<]+)/);
    const title = titleMatch ? titleMatch[1].replace(' - 博客', '').replace(' - 進 (Jin)', '').trim() : file.replace('.html', '');

    // Extract date from filename (YYYY-MM-DD or YYYY-MM-DD-*.html)
    const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '2026-01-01';

    // Extract main content (between <body>...</body>)
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    let bodyContent = bodyMatch ? bodyMatch[1].trim() : content;

    // Remove header/nav if present
    bodyContent = bodyContent.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    bodyContent = bodyContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

    // Remove the h1 title that's duplicated with page title
    bodyContent = bodyContent.replace(/<h1>[^<]*<\/h1>\s*<p class="meta">[^<]*<\/p>\s*<hr>\s*/gi, '');

    // Add front matter - use JSON-style quoting to handle special chars
    const escapedTitle = title
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ');
    const permalink = `/blog/${file}`;
    const frontMatter = `---
layout: article.njk
title: "${escapedTitle}"
date: "${date}"
tags: [blog]
permalink: ${permalink}
---\n`;

    const output = frontMatter + '\n' + bodyContent;

    // Write to src/blog/
    const outputFile = path.join(srcBlogDir, file);
    fs.writeFileSync(outputFile, output);

    console.log(`Migrated: ${file} -> ${outputFile}`);
});

console.log(`\nMigrated ${files.length} blog posts to src/blog/`);