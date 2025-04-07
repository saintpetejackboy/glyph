/**
 * Homoglyphs.js
 * Converts Latin characters to visually similar Unicode characters (primarily Cyrillic)
 * Ensures the homoglyphs survive in USC-2 and SMS
 */

// Homoglyph mapping with priority for Cyrillic characters
// Only using glyphs that are extremely similar to the original
// If no near-perfect match exists, the original character is used
const homoglyphMap = {
    'a': 'а',
    'b': 'b',
    'c': 'с',
    'd': 'd',
    'e': 'е',
    'g': 'g',
    'h': 'h',
    'i': 'і',
    'j': 'ј',
    'k': 'k',
    'l': 'l',
    'm': 'м',
    'n': 'n',
    'o': 'о',
    'p': 'р',
    'q': 'q',
    'r': 'r',
    's': 's',
    't': 't',
    'u': 'u',
    'v': 'v',
    'w': 'w',
    'x': 'х',
    'y': 'y',
    'z': 'z',
    'A': 'А',
    'B': 'Β',
    'C': 'С',
    'D': 'D',
    'E': 'Е',
    'F': 'F',
    'G': 'G',
    'H': 'Н',
    'I': 'І',
    'J': 'Ј',
    'K': 'К',
    'L': 'L',
    'M': 'М',
    'N': 'N',
    'O': 'О',
    'P': 'Р',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'Т',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'Х',
    'Y': 'Υ',
    'Z': 'Z',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',
    ',': ',',
    '!': '!',
    '?': '?',
    '@': '@',
    '#': '#',
    '$': '$',
    '%': '%',
    '^': '^',
    '&': '&',
    '*': '*',
    '(': '(',
    ')': ')',
    '-': '-',
    '_': '_',
    '=': '=',
    '+': '+',
    '[': '[',
    ']': ']',
    '{': '{',
    '}': '}',
    '|': '|',
    '\\': '\\',
    ':': ':',
    ';': ';',
    '"': '"',
    "'": "'",
    '<': '<',
    '>': '>',
    '/': '/',
    '~': '~',
    '`': '`',
    ' ': ' '
};

/**
 * Converts text to homoglyphs
 * @param {string} text - The input text to convert
 * @returns {Object} - An object containing the converted text and metadata
 */
function convertToHomoglyphs(text) {
    if (!text || typeof text !== 'string') {
        return { 
            converted: '', 
            original: '',
            changedChars: 0,
            totalChars: 0,
            percentChanged: 0
        };
    }

    let converted = '';
    let changedChars = 0;
    let totalChars = text.length;
    
    // Process each character
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const homoglyph = homoglyphMap[char];
        
        // If a homoglyph exists and it's different from the original
        if (homoglyph && homoglyph !== char) {
            converted += homoglyph;
            changedChars++;
        } else {
            // No homoglyph found, use the original
            converted += char;
        }
    }
    
    const percentChanged = totalChars > 0 ? Math.round((changedChars / totalChars) * 100) : 0;
    
    return {
        converted,
        original: text,
        changedChars,
        totalChars,
        percentChanged
    };
}

/**
 * Analyze which characters were changed in the conversion
 * @param {string} original - The original text
 * @param {string} converted - The converted text
 * @returns {Array} - Array of objects with char, homoglyph, and index
 */
function analyzeChanges(original, converted) {
    if (!original || !converted || original.length !== converted.length) {
        return [];
    }
    
    const changes = [];
    
    for (let i = 0; i < original.length; i++) {
        const originalChar = original[i];
        const convertedChar = converted[i];
        
        if (originalChar !== convertedChar) {
            changes.push({
                index: i,
                original: originalChar,
                homoglyph: convertedChar,
                codePoint: convertedChar.codePointAt(0).toString(16).toUpperCase()
            });
        }
    }
    
    return changes;
}

/**
 * Gets Unicode information for a character
 * @param {string} char - The character to analyze
 * @returns {Object} - Unicode information
 */
function getUnicodeInfo(char) {
    if (!char || char.length === 0) {
        return null;
    }
    
    const codePoint = char.codePointAt(0);
    const hex = codePoint.toString(16).toUpperCase();
    
    return {
        char,
        codePoint,
        hex: 'U+' + hex.padStart(4, '0'),
        decimal: codePoint,
        category: getUnicodeCategory(codePoint)
    };
}

/**
 * Get a simplified Unicode category
 * This is a very simplified version that just makes educated guesses
 * @param {number} codePoint - The Unicode code point
 * @returns {string} - Simplified category
 */
function getUnicodeCategory(codePoint) {
    if (codePoint >= 0x0400 && codePoint <= 0x04FF) {
        return 'Cyrillic';
    } else if (codePoint >= 0x0500 && codePoint <= 0x052F) {
        return 'Cyrillic Supplement';
    } else if (codePoint >= 0x0370 && codePoint <= 0x03FF) {
        return 'Greek';
    } else if (codePoint >= 0x0530 && codePoint <= 0x058F) {
        return 'Armenian';
    } else if (codePoint >= 0x13A0 && codePoint <= 0x13FF) {
        return 'Cherokee';
    } else if (codePoint >= 0x0000 && codePoint <= 0x007F) {
        return 'Basic Latin';
    } else if (codePoint >= 0x0080 && codePoint <= 0x00FF) {
        return 'Latin-1 Supplement';
    } else if (codePoint >= 0x0100 && codePoint <= 0x017F) {
        return 'Latin Extended-A';
    } else if (codePoint >= 0x0180 && codePoint <= 0x024F) {
        return 'Latin Extended-B';
    } else {
        return 'Other';
    }
}

/**
 * Validates if a character can be used in SMS/USC-2
 * @param {string} char - The character to check
 * @returns {boolean} - Whether the character is valid for USC-2
 */
function isValidForUSC2(char) {
    if (!char || char.length === 0) {
        return false;
    }
    
    const codePoint = char.codePointAt(0);
    
    // USC-2 can represent code points from U+0000 to U+FFFF
    return codePoint <= 0xFFFF;
}

// Export functions for use in other scripts
window.GlyphConverter = {
    convertToHomoglyphs,
    analyzeChanges,
    getUnicodeInfo,
    isValidForUSC2,
    homoglyphMap
};