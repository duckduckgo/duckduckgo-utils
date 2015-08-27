describe('DDG.parse_link', function() {

    it('should retreive matching links from different strings', function() {
        var link1 = DDG.parse_link('foo <a href="http://foobar.com">bars</a>','url'),
            link2 = DDG.parse_link("<a href='http://foobar.com'>foo</a> bars","url");

        expect(link1).toEqual(link2);
    });

    it('should extract text from first link within a string', function() {
        var text1 = "foobar",
            string = 'foo <a href="http://foo.bar">'+text1+'</a> bar <a href="#">bash</a>',
            text2 = DDG.parse_link(string,"text");

        expect(text1).toEqual(text2);
    });

    it('should fail gracefully and strip html if passed a string without a link', function() {
        var string = "foobar";
        
        expect(string).toEqual(DDG.parse_link('<b>'+string+'</b>',"rest"));
    });

    it('should return different values when requesting different parts of the string', function() {
        var string = 'foo <a href="http://foobar.com">bars</a>',
            text1 = DDG.parse_link(string,'url'),
            text2 = DDG.parse_link(string,'text');

        expect(text1).not.toEqual(text2);
    });
    
    it('should strip the first link and return only the text from the second link along with the un-wrapped text', function() {
        var linkText = 'bars',
            link = '<a href="http://foobar.com">'+linkText+'</a>',
            string1 = 'foo',
            string2 = link+string1+link,
            parsed = DDG.parse_link(string2,'rest');

        expect(parsed).toEqual(string1+linkText);
    });

});
