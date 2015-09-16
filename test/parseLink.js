describe('DDG.parse_link', function() {

    var tests = [
        ['foo <a href="http://foobar.com">bars</a>', 'url', 'http://foobar.com/'],
        ['<a href="http://foobar.com">foo</a> bars', 'url', 'http://foobar.com/'],
        ['foo <a href="http://foo.bar">foobar</a> bar <a href="#">bash</a>', 'text', 'foobar'],
        ['<b>foobar</b>', 'rest', 'foobar'],
        ['foo <a href="http://foobar.com">bars</a>', 'text', 'bars'],
        ['<a href="http://foobar.com">bars</a>foo<a href="http://foobar.com">bars</a>', 'rest', 'foobars'],
        ['<a href="http://foobar.com">blah</a> - something', 'rest', 'something'],
        ['<a href="http://foobar.com">blah</a>, something', 'rest', 'something'],
        ['"<a href="http://foobar.com">blah</a>" something', 'rest', 'something']
    ];

    tests.forEach(function(test) {
        it('should parse the string correctly', function() {
            expect(DDG.parse_link(test[0], test[1])).toEqual(test[2]);
        });
    });

});
