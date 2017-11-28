var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        var from = 'Jimmy';
        var text = 'My message';
        
        var message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);

        expect(message).toInclude({
            from,
            text
        });
        expect(message.createdAt).toBeA("number");
    });
});

describe('generateLocationMessage', () => {
    
        it('should generate correct location object', () => {
            var from = 'Jimmy';
            var latitude = '64.0570981';
            var longitude = '-139.5205042';
            var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
            
            var message = generateLocationMessage(from, latitude, longitude);
            expect(message.from).toBe(from);
            expect(message.url).toBe(url);
    
            expect(message).toInclude({
                from,
                url
            });
            expect(message.createdAt).toBeA("number");
        });
    });