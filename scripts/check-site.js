#!/usr/bin/env node
/**
 * 网站完整性检查脚本
 * 防止 AI 修改导致网站被破坏
 */

const fs = require('fs');
const path = require('path');

const WWW_DIR = 'www';
const SRC_DIR = 'src';

const issues = [];
const warnings = [];

// 检查必要文件是否存在
const requiredFiles = [
    'index.html',
    'blog/index.html',
    'insights/index.html',
    'sources/index.html',
    'strategy/index.html',
];

// 检查必要目录
const requiredDirs = [
    'blog',
    'insights',
];

// 检查导航必须包含的链接
const requiredNavLinks = [
    '/',
    '/blog/',
    '/insights/',
];

function checkFileExists(filePath) {
    return fs.existsSync(path.join(WWW_DIR, filePath));
}

function checkDirExists(dirPath) {
    return fs.existsSync(path.join(WWW_DIR, dirPath));
}

function checkHTMLValidity(filePath) {
    const fullPath = path.join(WWW_DIR, filePath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf-8');

    // 检查基本的 HTML 结构
    if (!content.includes('<!DOCTYPE html>') && !content.includes('<html')) {
        issues.push(`❌ ${filePath}: Missing DOCTYPE or html tag`);
        return;
    }

    // 检查是否有多余的 iframe（曾经的架构问题）
    if (content.includes('<iframe')) {
        issues.push(`❌ ${filePath}: Contains iframe tag (old architecture)`);
    }

    // 检查是否有外链 script 注入风险
    const scriptMatches = content.match(/<script[^>]*src=["'][^"']+["']/gi) || [];
    for (const script of scriptMatches) {
        if (!script.includes('localhost') && !script.includes('127.0.0.1')) {
            const srcMatch = script.match(/src=["']([^"']+)["']/);
            if (srcMatch && !srcMatch[1].startsWith('/')) {
                issues.push(`❌ ${filePath}: External script detected: ${srcMatch[1]}`);
            }
        }
    }
}

function checkNavigation(filePath) {
    const fullPath = path.join(WWW_DIR, filePath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf-8');

    for (const link of requiredNavLinks) {
        if (!content.includes(`href="${link}"`) && !content.includes(`href='${link}'`)) {
            warnings.push(`⚠️ ${filePath}: Missing navigation link to ${link}`);
        }
    }
}

function checkNoIndexIframe() {
    const indexPath = path.join(WWW_DIR, 'index.html');
    if (!fs.existsSync(indexPath)) return;

    const content = fs.readFileSync(indexPath, 'utf-8');

    if (content.includes('iframe')) {
        issues.push(`❌ index.html: Contains iframe tag (should be multi-page, not SPA)`);
    }
}

function checkBlogPostStructure(filePath) {
    const fullPath = path.join(WWW_DIR, filePath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf-8');

    // 检查是否有导航
    if (!content.includes('<header') && !content.includes('<nav')) {
        warnings.push(`⚠️ ${filePath}: Missing navigation header`);
    }

    // 检查是否有 footer
    if (!content.includes('<footer')) {
        warnings.push(`⚠️ ${filePath}: Missing footer`);
    }
}

function checkNoBadPatterns(filePath) {
    const fullPath = path.join(WWW_DIR, filePath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf-8');
    const lowerContent = content.toLowerCase();

    // 检查可疑模式
    const badPatterns = [
        { pattern: /eval\s*\(/i, message: 'eval() detected' },
        { pattern: /document\.write/i, message: 'document.write() detected' },
        { pattern: /innerhtml\s*=\s*[^"']*<script/i, message: 'Script injection via innerHTML' },
        { pattern: /onclick\s*=\s*["'][^"']*javascript:/i, message: 'Javascript URI in onclick' },
    ];

    for (const { pattern, message } of badPatterns) {
        if (pattern.test(content)) {
            issues.push(`❌ ${filePath}: ${message}`);
        }
    }
}

function checkBuildOutput() {
    // 确保 www 目录存在且有内容
    if (!fs.existsSync(WWW_DIR)) {
        issues.push(`❌ ${WWW_DIR} directory does not exist`);
        return;
    }

    const files = fs.readdirSync(WWW_DIR, { recursive: true });
    if (files.length === 0) {
        issues.push(`❌ ${WWW_DIR} is empty - did you run build?`);
    }
}

function main() {
    console.log('🔍 检查网站完整性...\n');

    // 1. 检查必要文件
    console.log('📁 检查必要文件...');
    for (const file of requiredFiles) {
        if (checkFileExists(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            issues.push(`❌ Missing required file: ${file}`);
        }
    }

    // 2. 检查必要目录
    console.log('\n📂 检查必要目录...');
    for (const dir of requiredDirs) {
        if (checkDirExists(dir)) {
            console.log(`  ✅ ${dir}/`);
        } else {
            issues.push(`❌ Missing required directory: ${dir}/`);
        }
    }

    // 3. 检查 index.html 不是 iframe 架构
    console.log('\n🏗️ 检查架构...');
    checkNoIndexIframe();

    // 4. 检查所有 HTML 文件的有效性
    console.log('\n📄 检查 HTML 文件...');
    function walkDir(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else if (entry.name.endsWith('.html')) {
                checkHTMLValidity(fullPath);
                checkNavigation(fullPath);
                checkNoBadPatterns(fullPath);
                if (fullPath.includes('blog/') || fullPath.includes('insights/')) {
                    checkBlogPostStructure(fullPath);
                }
            }
        }
    }
    walkDir(WWW_DIR);

    // 5. 检查构建输出
    console.log('\n🔨 检查构建...');
    checkBuildOutput();

    // 输出结果
    console.log('\n' + '='.repeat(50));

    if (issues.length > 0) {
        console.log('\n❌ 发现问题:\n');
        issues.forEach(issue => console.log('  ' + issue));
    }

    if (warnings.length > 0) {
        console.log('\n⚠️ 警告:\n');
        warnings.forEach(warning => console.log('  ' + warning));
    }

    if (issues.length === 0 && warnings.length === 0) {
        console.log('\n✅ 网站检查通过！没有发现问题。\n');
        process.exit(0);
    } else if (issues.length === 0) {
        console.log('\n✅ 无阻塞问题（只有警告）。\n');
        process.exit(0);
    } else {
        console.log('\n❌ 检查失败！请修复上述问题。\n');
        process.exit(1);
    }
}

main();