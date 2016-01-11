describe('DDG.isInternalURL()', function() {

    var internalURLs = [
            "/about",
            "/?q=foo",
            "#",
            "javascript:"
        ],
        externalURLs = [
            "https://example.com",
            "http://example.com"
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

