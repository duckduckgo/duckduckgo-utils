describe('DDG.get_favicon_url', function() {

    var tests = [
        ['amazonwatch.org', '/assets/icons/favicons/amazonwatch.org.ico'],
        ['amazon.com', '/assets/icons/favicons/amazon.png'],
        ['www.amazon.com', '/assets/icons/favicons/amazon.png'],
        ['watches.amazon.com', '/assets/icons/favicons/amazon.png'],
        ['duckduckgo.com', '/assets/icons/favicons/duckduckgo.com.ico'],
        ['youtube', '/assets/icons/favicons/youtube.png'],
        ['en.wikipedia.org', '/assets/icons/favicons/wikipedia.png']
    ];

    beforeEach(function() {
        DDG.services = {};
        DDG.services.getURL = function() {
            return "/assets/icons/favicons/";
        }
    });

    tests.forEach(function(test) {
        it('should get the correct fav icon url for ' + test[0], function() {
            expect(DDG.get_favicon_url(test[0])).toEqual(test[1]);
        });
    });

});
