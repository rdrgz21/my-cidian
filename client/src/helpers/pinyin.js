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

export const validPinyinRegex = /(zh|ch|sh|b|p|m|f|d|t|n|z|c|s|l|r|j|q|x|g|k|h|y|w|){1}(iang|iong|uang|ang|eng|ong|iao|ian|ing|uai|uan|ai|ei|ao|ou|an|en|er|ia|ie|iu|in|ua|uo|ui|un|ue|üe|a|e|i|o|u|ü){1}$/

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

export const getFinal = string => {
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
        return null;
    }
};

const isVowel = string => {
    return pinyin.finals.oneLetter.includes(string)
};

const getVowels = final => {
    const vowels = final.split('').filter(isVowel);
    return vowels;
};

export const getUntonedVowel = final => {
    const vowels = getVowels(final);

    if (vowels.length === 1) return vowels[0];
    
    if (final.includes('a')) return 'a';
    if (final.includes('e')) return 'e';
    if (final.includes('ou')) return 'o';
    return vowels[1];
};

export const applyTone = (string, tone) => {
    const final = getFinal(string);

    if (!final) {
        return null;
    }

    const untonedVowel = getUntonedVowel(final);
    const tonedVowel = getTonedVowel(untonedVowel, tone);
    const tonedString = string.replace(untonedVowel, tonedVowel);

    return tonedString;
  };

export const removePunctuationFromChinese = (string) => {
    const punctuationRegex = /[，。！？]/g;
    const newString = string.replace(punctuationRegex, '').split('');
    return newString;
};

// Algorithm for correct diacritic placement
// If final contains a/e, it will take tone mark
// If it contains ou, the o will take tone mark
// otherwise, second vowel takes tone mark

// Need function to separate initial from final
// if first two letter matches pinyin.twoLetterInitials, split
// otherwise, split at first 

