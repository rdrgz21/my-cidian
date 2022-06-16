import { getFinal, getUntonedVowel, applyTone } from './pinyin';

describe('getFinal function', () => {
    // it('should return null if no match', () => {
    //     // fixtures // set up variables
    //     const inputString = 'abcedef';

    //     // execute
    //     const result = getFinal(inputString);

    //     // assertion
    //     expect(result).toBe(null);
    // });

    it.each`
    input | output 
    ${'abcedef'} | ${null}
    ${'chi'} | ${'i'}
    ${'nü'} | ${'ü'}
    ${'xie'} | ${'ie'}
    ${'xiong'} | ${'iong'}
    `('should match $input with $output', ({ input, output }) => {
        expect(getFinal(input)).toEqual(output);
    })
});

describe('getUntownedVowel function', () => {
    it('should return the same string if the final consists of one vowel', () => {
        const inputString = 'a';
        const result = getUntonedVowel(inputString);

        expect(result).toBe(inputString);
    });

    it('should return "a" if the final contains "a"', () => {
        const inputString = 'uang';
        const result = getUntonedVowel(inputString);

        expect(result).toBe('a');
    });

    it('should return "e" if the final contains "e" but no "a"', () => {
        const inputString = 'ue';
        const result = getUntonedVowel(inputString);

        expect(result).toBe('e');
    });

    it('should return "o" if the final contains "ou"', () => {
        const inputString = 'ou';
        const result = getUntonedVowel(inputString);

        expect(result).toBe('o');
    });

    it('should return the second vowel in the final and does not contain a/e/ou', () => {
        const inputString = 'iong';
        const result = getUntonedVowel(inputString);

        expect(result).toBe('o');
    });
});

describe('applyTone function', () => {
    it('should return null if an invalid string is passed', () => {
        const inputString = 'abcedf';
        const result = applyTone(inputString, 1);

        expect(result).toBe(null);
    });

    it.each`
    input
    ${'xiong'}
    ${'dian'}
    ${'bei'}
    ${'nü'}
    ${'mu'}
    ${'i'}
    `('should return the same string with no diacritcs if the tone is neutral (0)', ({ input }) => {
        expect(applyTone(input, 0)).toEqual(input);
    })

    it.each`
    input | output
    ${'xiong'} | ${'xiōng'}
    ${'dian'} | ${'diān'}
    ${'bei'} | ${'bēi'}
    ${'nü'} | ${'nǖ'}
    ${'mu'} | ${'mū'}
    ${'i'} | ${'ī'}
    `('should return the same string with the first tone diacritc on the correct vowel', ({ input, output }) => {
        expect(applyTone(input, 1)).toEqual(output);
    })

    it.each`
    input | output
    ${'xiong'} | ${'xióng'}
    ${'dian'} | ${'dián'}
    ${'bei'} | ${'béi'}
    ${'nü'} | ${'nǘ'}
    ${'mu'} | ${'mú'}
    ${'i'} | ${'í'}
    `('should return the same string with the second tone diacritc on the correct vowel', ({ input, output }) => {
        expect(applyTone(input, 2)).toEqual(output);
    })

    it.each`
    input | output
    ${'xiong'} | ${'xiǒng'}
    ${'dian'} | ${'diǎn'}
    ${'bei'} | ${'běi'}
    ${'nü'} | ${'nǚ'}
    ${'mu'} | ${'mǔ'}
    ${'i'} | ${'ǐ'}
    `('should return the same string with the third tone diacritc on the correct vowel', ({ input, output }) => {
        expect(applyTone(input, 3)).toEqual(output);
    })

    it.each`
    input | output
    ${'xiong'} | ${'xiòng'}
    ${'dian'} | ${'diàn'}
    ${'bei'} | ${'bèi'}
    ${'nü'} | ${'nǜ'}
    ${'mu'} | ${'mù'}
    ${'i'} | ${'ì'}
    `('should return the same string with the fourth tone diacritc on the correct vowel', ({ input, output }) => {
        expect(applyTone(input, 4)).toEqual(output);
    })

})