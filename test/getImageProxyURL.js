describe('DDG.getImageProxyURL', function() {

    beforeEach(function() {
        DDG.services = {};
        DDG.services.getURL = function() {
            return '//proxy.duckduckgo.com/iu/';
        }
    });

    it('should not encode internal url',function() {
        expect(DDG.getImageProxyURL('http://www.duckduckgo.com/?q=a'))
            .toEqual('http://www.duckduckgo.com/?q=a')
    });

    it('should encode external url',function() {
        expect(DDG.getImageProxyURL('http://www.test.com'))
            .toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com&f=1')
    });

    it('should add current protocol if missing',function() {
        expect(DDG.getImageProxyURL('//www.test.com'))
            .toEqual('//proxy.duckduckgo.com/iu/?u=file%3A%2F%2Fwww.test.com&f=1')
    });

    it('should not encode if dontEncode = true',function() {
        expect(DDG.getImageProxyURL('http://www.test.com', true))
            .toEqual('//proxy.duckduckgo.com/iu/?u=http://www.test.com&f=1')
    });

    it('should add w if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', false, 200))
            .toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&w=200')
    });

    it('should add h if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', false, false, 200))
            .toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&h=200')
    });

    it('should add w & h if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', false, 100, 200))
            .toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&w=100&h=200')
    });
});
