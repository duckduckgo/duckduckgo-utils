describe('DDG.getDateFromString', function() {

    it('should make sure unzoned dates match', function() {
        var date1 = DDG.getDateFromString("1998-01-01T12:00:00").getTime(),
            date2 = DDG.getDateFromString("1998-01-01T12:00:00").getTime();

        expect(date1).toEqual(date2);
    });

    it('should make sure zoned dates match', function() {
        var date1 = DDG.getDateFromString("1998-01-01T12:00:00Z").getTime(),
            date2 = DDG.getDateFromString("1998-01-01T12:00:00Z").getTime();

        expect(date1).toEqual(date2);
    });

    it('should make sure browser context is not in UTC', function() {
        expect(new Date().getTimezoneOffset()).not.toEqual(0);
    });

    it('should make sure UTC timestamps are different from local', function() {
        var date1 = DDG.getDateFromString("1998-01-01T12:00:00").getTime(),
            date2 = DDG.getDateFromString("1998-01-01T12:00:00Z").getTime();

        expect(date1).not.toEqual(date2);
    });
    
    if('should actually parse dates correctly', function() {
        var string = "2015-06-14T17:35:00Z",
            date = DDG.getDateFromString(string).toISOString();
        
        expect(string).toEqual(date);
    });

});
