const {isValidPassword} = require('./validator')

describe('isValidPassword', () => {
    // Happy path
    test('valid password', () => {
        const result = isValidPassword('MoNagy12345');
        expect(result).toEqual({ valid: true, reason: '' });
    });

    // Too short
    test('too short', () => {
        const result = isValidPassword('Nagy12');
        expect(result).toEqual({ valid: false, reason: 'Too short (min 8 characters)' });
    });

    // No uppercase
    test('no uppercase', () => {
        const result = isValidPassword('nagy12345');
        expect(result).toEqual({ valid: false, reason: 'Must contain an uppercase letter' });
    });

    // No number
    test('no number', () => {
        const result = isValidPassword('NagyAbcde');
        expect(result).toEqual({ valid: false, reason: 'Must contain a number' });
    });

    // Wrong type
    test('wrong type', () => {
        const result = isValidPassword(5054132);
        expect(result).toEqual({ valid: false, reason: 'Password must be a string' });
    });

    // Edge case
    test('exactly 8 characters', () => {
        const result = isValidPassword('Nagy1234');
        expect(result).toEqual({ valid: true, reason: '' });
    });

    // Empty string
    test('empty string', () => {
        const result = isValidPassword('');
        expect(result).toEqual({ valid: false, reason: 'Too short (min 8 characters)' });
    });

    // Too Long Password
    test('too long pass', () => {
        const pass = 'nagy123456789'.repeat(10**12) + '1';
        const result = isValidPassword(pass);
        expect(result).toEqual({ valid: false, reason: 'Must contain an uppercase letter' });
    });

    test('technically valid but practically useless', () => {
        const result = isValidPassword('A 1      ');
        expect(result).toEqual({ valid: true, reason: '' });
    });

    test('unicode', () => {
        const result = isValidPassword('ÉÉÉÉÉÉÉÉÉ123');
        expect(result).toEqual({ valid: true, reason: '' });
    });

    test('null byte', () => {
        const result = isValidPassword('Vaal\0id 010');
        expect(result).toEqual({ valid: true, reason: '' });
    });
});