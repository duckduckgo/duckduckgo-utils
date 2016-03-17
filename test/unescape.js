describe('DDG.unescape()', function() {

    var tests = [
        // no matched entities:
        ['this is something &else', 'this is something &else'],

        // only one entity
        ['2 &gt; 1', '2 > 1'],

        // one entity after the other
        ['this is a diamond! &lt;&gt;','this is a diamond! <>'],
        
        // one entity and one lonely &
        ['true &amp;& false', 'true && false']
    ];

    tests.forEach(function(test) {
        it('should unescape HTML entities correctly', function() {
            expect(DDG.unescape(test[0])).toEqual(test[1]);
        });
    });

});
