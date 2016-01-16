describe('DDG.isInternalURL()', function() {

    var internalURLs = [
            null,
            "",
            "/",
            "/about",
            "/?q=foo",
            "#",
            "javascript:",
            "http://duckduckgo.com/",
            "http://duckduckgo.com/spread",
            "https://duckduckgo.com/?q=foo",
            "https://ddh2.duckduckgo.com/?q=foo",
            "//duckduckgo.com/foo.png",
            "//images.duckduckgo.com/foo.png"
        ],
        externalURLs = [
            "https://example.com",
            "http://example.com",
            "http://example.com/?foo=duckduckgo.com",
            "http://example.com/duckduckgo.com",
            "//example.com/foo.png"
        ];

    internalURLs.forEach(function (url) {
        it("should return true for " + url, function () {
            expect(DDG.isInternalURL(url)).toEqual(true);
        });
    });

    externalURLs.forEach(function (url) {
        it("should return false for " + url, function () {
            expect(DDG.isInternalURL(url)).toEqual(false);
        });
    });
});

