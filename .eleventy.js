const fs = require("fs");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");

    // Filters
    eleventyConfig.addFilter("dateFormat", function(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
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
