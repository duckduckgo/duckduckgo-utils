describe('DDG.addSearchParam()', function() {

    it('should add ?q=test to the URL', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com', 'q', 'test'))
            .toEqual('https://duckduckgo.com/?q=test');
    });

    it('should ignore existing ?', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com?', 'q', 'test'))
            .toEqual('https://duckduckgo.com/?q=test');
    });

    it('shouldn\'t change existing params', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com?atb=v100-1', 'q', 'test'))
            .toEqual('https://duckduckgo.com/?atb=v100-1&q=test');
    });

    it('shouldn\'t change the hash', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com?atb=v100-1#main', 'q', 'test'))
            .toEqual('https://duckduckgo.com/?atb=v100-1&q=test#main');
    });

    it('should encode the key and the value', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com?atb=v100-1#main', 'oh?no', 'this&is#wrong'))
            .toEqual('https://duckduckgo.com/?atb=v100-1&oh%3Fno=this%26is%23wrong#main');
    });

    it('should work with various protocols', function() {
        expect(DDG.addSearchParam('wss://duckduckgo.com/?atb=v100-1#main', 'this', 'works'))
            .toEqual('wss://duckduckgo.com/?atb=v100-1&this=works#main');

        expect(DDG.addSearchParam('ftp://duckduckgo.com/?atb=v100-1#main', 'this', 'works'))
            .toEqual('ftp://duckduckgo.com/?atb=v100-1&this=works#main');
    });

    it('should only append key if no value is provided', function() {
        expect(DDG.addSearchParam('https://duckduckgo.com', 'key'))
            .toEqual('https://duckduckgo.com/?key');
    });
});
