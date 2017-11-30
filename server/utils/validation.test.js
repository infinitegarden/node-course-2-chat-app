const expect = require('expect');
// import isRealString
const {isRealString} = require ('./validation');

// isRealString
describe('isRealString', () =>  {

    it ('should reject non-string values', () => {
        expect (isRealString(123)).toBeFalsy();
    });

    it ('should reject string with only spaces', () => {
        expect (isRealString("   ")).toBeFalsy();
    });

    it ('should allow string with non-space characters', () => {
        expect (isRealString("I am a real string")).toBeTruthy();
    });
            
});
    