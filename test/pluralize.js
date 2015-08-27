describe('DDG.pluralize()', function() {

    it('should return "days" for 0,day --> 0 days', function() {
        expect(DDG.pluralize(0, 'day')).toEqual('days');
    });

    it('should return "day" for 1,day --> 1 day', function() {
        expect(DDG.pluralize(1, 'day')).toEqual('day');
    });

    it('should return "days" for 2,day --> 2 days', function() {
        expect(DDG.pluralize(2, 'day')).toEqual('days');
    });

    it('should return "days" for -10,day --> -10 days', function() {
        expect(DDG.pluralize(-10, 'day')).toEqual('days');
    });

    it('should return "tries" for 50,try,tries --> 50 tries', function() {
        expect(DDG.pluralize(50, 'try', 'tries')).toEqual('tries');
    });

    it('should return "try" for 1,try,tries --> 1 try', function() {
        expect(DDG.pluralize(1, 'try', 'tries')).toEqual('try');
    });

    it('should return "try" for 1.0,try,tries --> 1.0 try', function() {
        expect(DDG.pluralize(1.0, 'try', 'tries')).toEqual('try');
    });

    it('should return "tries" for 1.3,try,tries --> 1.3 tries', function() {
        expect(DDG.pluralize(1.3, 'try', 'tries')).toEqual('tries');
    });

});
