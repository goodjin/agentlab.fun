const fs = require("fs");

const site = {
    title: "Jin's AI Companion",
    url: "https://agentlab.fun",
    author: "Jin Shan",
    description: "Jin 的 AI 与 Agent 系统思考：Agent Runtime、工具调用治理、AI 编程、人机协作和长期技术判断。"
};

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
    eleventyConfig.addGlobalData("site", site);

    // Filters
    eleventyConfig.addFilter("dateFormat", function(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    });

    eleventyConfig.addFilter("htmlDateString", function(date) {
        if (!date) return '';
        return new Date(date).toISOString();
    });

    eleventyConfig.addFilter("absoluteUrl", function(url) {
        if (!url) return site.url + "/";
        return new URL(url, site.url).href;
    });

    eleventyConfig.addFilter("jsString", function(value) {
        return JSON.stringify(value || "");
    });

    eleventyConfig.addFilter("stripHtml", function(value) {
        return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    });

    eleventyConfig.addFilter("excerpt", function(value, length = 220) {
        const text = String(value || "").replace(/\s+/g, " ").trim();
        return text.length > length ? text.slice(0, length).trim() + "..." : text;
    });

    eleventyConfig.addFilter("head", function(collection, count) {
        return collection.slice(0, count);
    });

    eleventyConfig.addFilter("displayTitle", function(post) {
        if (post?.data?.title) return post.data.title;
        if (!post?.inputPath) return post?.fileSlug || '';

        try {
            const content = fs.readFileSync(post.inputPath, "utf8");
            const heading = content.match(/^#\s+(.+)$/m);
            return heading ? heading[1].trim() : post.fileSlug;
        } catch {
            return post.fileSlug || '';
        }
    });

    // Return configuration
    return {
        dir: {
            input: "src",
            output: "www",
            includes: "_includes",
            data: "_data",
            layouts: "_layouts"
        },
        templateFormats: ["html", "njk", "md"],
        htmlTemplateEngine: "html",
        markdownTemplateEngine: "njk"
    };
};
