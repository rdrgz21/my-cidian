export const pinyin = {
    initials: {
        twoLetters: ['zh','ch', 'sh'],
        oneLetter: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'z', 'c', 's', 'l', 'r', 'j', 'q', 'x', 'g', 'k', 'h', 'y', 'w']
    },
    finals: {
        fourLetters: ['iang', 'iong', 'uang'],
        threeLetters: ['ang', 'eng', 'ong', 'iao', 'ian', 'ing', 'uai', 'uan'],
        twoLetters: ['ai', 'ei', 'ao', 'ou', 'an', 'en', 'er', 'ia', 'ie', 'iu', 'in', 'ua', 'uo', 'ui', 'un', 'ue', 'üe'],
        oneLetter: ['a', 'e', 'i', 'o', 'u', 'ü']
    }
};

const tonedVowels = {
    'a': ['a', 'ā', 'á', 'ǎ', 'à'],
    'e': ['e','ē','é','ě','è'],
    'i': ['i','ī','í','ǐ','ì'],
    'o': ['o','ō','ó','ǒ','ò'],
    'u': ['u','ū','ú','ǔ','ù'],
    'ü': ['ü','ǖ','ǘ','ǚ','ǜ']
}

const getTonedVowel = (vowel, tone) => {
    return tonedVowels[vowel][tone];
};

const getFinal = string => {
    const lastFourChars = string.substr(string.length - 4);
    const lastThreeChars = string.substr(string.length - 3);
    const lastTwoChars = string.substr(string.length - 2);
    const lastChar = string.substr(string.length - 1);

    if (pinyin.finals.fourLetters.includes(lastFourChars)) {
        return lastFourChars;
    } else if (pinyin.finals.threeLetters.includes(lastThreeChars)) {
        return lastThreeChars;
    } else if (pinyin.finals.twoLetters.includes(lastTwoChars)) {
        return lastTwoChars;
    } else if (pinyin.finals.oneLetter.includes(lastChar)) {
        return lastChar;
    } else {
        console.error('No valid final found');
    }
};

const isVowel = string => {
    return pinyin.finals.oneLetter.includes(string)
};

const getVowels = final => {
    const vowels = final.split('').filter(isVowel);
    return vowels;
};

const getUntonedVowel = final => {
    const vowels = getVowels(final);
    const noOfVowels = vowels.length;

    if (noOfVowels === 0 || noOfVowels > 3) {
        console.log('Too few/many vowels');
    } else if (noOfVowels === 1) {
        return vowels[0];
    } else if (noOfVowels > 1) {
        if (final.includes('a')){
            return 'a';
        } else if (final.includes('e')){
            return 'e';
        } else if (final.includes('ou')){
            return 'o';
        } else {
            return vowels[1];
        }
    } else {
        console.error('There was an error identifying the vowel to mark with tone');
    }
};

export const applyTone = (string, tone) => {
    const final = getFinal(string);
    const untonedVowel = getUntonedVowel(final);
    const tonedVowel = getTonedVowel(untonedVowel, tone);
    const tonedString = string.replace(untonedVowel, tonedVowel);

    return tonedString;
  };

// Algorithm for correct diacritic placement
// If final contains a/e, it will take tone mark
// If it contains ou, the o will take tone mark
// otherwise, second vowel takes tone mark

// Need function to separate initial from final
// if first two letter matches pinyin.twoLetterInitials, split
// otherwise, split at first 

