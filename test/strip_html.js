describe('DDG.strip_html', function() {

    var tests = [
        // regular tag:
        ['<img src="http://duckduckgo.com/image.png" />', ''],

        // text around the tag:
        ['This is a <b>test</b>.', 'This is a test.'],

        // malformed tag with no spaces (doesn't get stripped):
        ['<img+onerror="document.write(\'Oh+nooo...\');alert(\'Hacked+Again!\')"+src="','<img+onerror="document.write(\'Oh+nooo...\');alert(\'Hacked+Again!\')"+src="'],

        // regular text with < and > signs:
        ['10 < 11','10 < 11'],
        ['10 > 11','10 > 11']
    ];

    tests.forEach(function(test) {
        it('should strip all html correctly', function() {
            expect(DDG.strip_html(test[0])).toEqual(test[1]);
        });
    });

});
