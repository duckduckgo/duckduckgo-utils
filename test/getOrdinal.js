describe('DDG.getOrdinal()', function() {

    it('should return "1st" for 1', function() {
        expect(DDG.getOrdinal(1)).toEqual('1st');
    });

    it('should return "2nd" for 2', function() {
        expect(DDG.getOrdinal(2)).toEqual('2nd');
    });

    it('should return "3rd" for 3', function() {
        expect(DDG.getOrdinal(3)).toEqual('3rd');
    });

    it('should return "4th" for 4', function() {
        expect(DDG.getOrdinal(4)).toEqual('4th');
    });

    it('should return "300th" for 300', function() {
        expect(DDG.getOrdinal(300)).toEqual('300th');
    });

    it('should not return "0th" for 0', function() {
        expect(DDG.getOrdinal(0)).not.toEqual('0th');
    });

    it('should not return "undefinedth" for an empty var', function() {
        expect(DDG.getOrdinal()).not.toEqual('undefinedth');
    });

});
