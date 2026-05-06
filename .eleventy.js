module.exports = function(eleventyConfig) {
    // Filters
    eleventyConfig.addFilter("dateFormat", function(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
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