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
        expect(DDG.getImageProxyURL('http://www.test.com', {
            dontEncode: true
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http://www.test.com&f=1')
    });

    it('should add w if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', {
            dontEncode: false,
            width: 200
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&w=200')
    });

    it('should add h if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', {
            dontEncode: false,
            width: false,
            height: 200
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&h=200')
    });

    it('should add w & h if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', {
            dontEncode: false,
            width: 100,
            height: 200
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&w=100&h=200')
    });

    it('should add ipt (token) & ipo (origin) if supplied',function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', {
            dontEncode: false,
            token: '89603aab4a8f4de9c331184cb3d855871fa8430a3bf725c70c04766828598f16',
            origin: 'images',
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&ipt=89603aab4a8f4de9c331184cb3d855871fa8430a3bf725c70c04766828598f16&ipo=images')
    });

    it('should add nofb param', function() {
        expect(DDG.getImageProxyURL('http://www.test.com/img.jpg', {
            noFallback: true,
            width: 100
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.test.com%2Fimg.jpg&f=1&w=100&nofb=1')
    });

    it('should handle the noAutoPadding option', function() {
        expect(DDG.getImageProxyURL('http://www.example.com/img.jpg', {
            noAutoPadding: true
        })).toEqual('//proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.example.com%2Fimg.jpg&f=1&p=0')
    })
});
