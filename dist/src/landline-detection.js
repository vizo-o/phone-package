"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLandlineNumber = isLandlineNumber;
exports.detectLandline = detectLandline;
const country_detection_1 = require("./country-detection");
const normalization_1 = require("./normalization");
const types_1 = require("./types");
/**
 * Detects if a normalized E.164 phone number is a landline number for a given country.
 * @param phoneNumber - Normalized E.164 phone number (e.g., +97221234567)
 * @param country - The detected country of the phone number
 * @returns true if it's a landline number, false otherwise
 */
function isLandlineNumber(phoneNumber, country) {
    if (!phoneNumber || !country) {
        return false;
    }
    let number;
    switch (country) {
        case types_1.Country.IL: {
            // Israeli landline: +972 + 8-9 digits starting with 2, 3, 4, 8, 9 (not mobile prefixes 50, 52, 53, 54, 55, 58)
            // Note: Israeli landlines can be 8 or 9 digits after +972 (e.g., +97225340661 is 8 digits, +97221234567 is 9 digits)
            if (!phoneNumber.startsWith('+972')) {
                return false;
            }
            number = phoneNumber.substring(4); // Remove +972
            // Israeli numbers can be 8 or 9 digits after country code
            if (number.length < 8 || number.length > 9) {
                return false;
            }
            const mobilePrefixes = ['50', '52', '53', '54', '55', '58'];
            // If it starts with a mobile prefix, it's not a landline
            if (mobilePrefixes.some((prefix) => number.startsWith(prefix))) {
                return false;
            }
            // Israeli landline prefixes: 2, 3, 4, 8, 9
            const firstDigit = number.charAt(0);
            return ['2', '3', '4', '8', '9'].includes(firstDigit);
        }
        case types_1.Country.DE: {
            // German landline: +49 + 8-11 digits NOT starting with 15X, 16X, 17X
            if (!phoneNumber.startsWith('+49')) {
                return false;
            }
            number = phoneNumber.substring(3); // Remove +49
            if (number.length < 8 || number.length > 11) {
                return false;
            }
            // Mobile numbers start with 15, 16, or 17
            // If it starts with mobile prefix, it's not a landline
            if (/^1[567]/.test(number)) {
                return false;
            }
            // German landlines typically start with area codes like 30 (Berlin), 40 (Hamburg), etc.
            return true;
        }
        case types_1.Country.IT: {
            // Italian landline: +39 + 9-10 digits NOT starting with 3XX (mobile operators)
            if (!phoneNumber.startsWith('+39')) {
                return false;
            }
            number = phoneNumber.substring(3); // Remove +39
            if (number.length < 9 || number.length > 10) {
                return false;
            }
            // Italian mobile numbers typically start with 3XX (e.g., 391, 392, 393, etc.)
            // Landlines typically start with 0X or other patterns
            // If it starts with 3XX, it's likely mobile
            if (/^3\d{2}/.test(number)) {
                return false;
            }
            // Otherwise, it's likely a landline
            return true;
        }
        case types_1.Country.GB: {
            // UK landline: +44 + 10 digits NOT starting with 7 (mobile numbers start with 7)
            if (!phoneNumber.startsWith('+44')) {
                return false;
            }
            number = phoneNumber.substring(3); // Remove +44
            if (number.length !== 10) {
                return false;
            }
            // UK mobile numbers start with 7
            // If it doesn't start with 7, it's likely a landline
            return !number.startsWith('7');
        }
        case types_1.Country.FR: {
            // French landline: +33 + 9 digits NOT starting with 6 or 7 (mobile numbers start with 6 or 7)
            if (!phoneNumber.startsWith('+33')) {
                return false;
            }
            number = phoneNumber.substring(3); // Remove +33
            if (number.length !== 9) {
                return false;
            }
            // French mobile numbers start with 6 or 7
            // If it doesn't start with 6 or 7, it's likely a landline
            return !/^[67]/.test(number);
        }
        case types_1.Country.ES: {
            // Spanish landline: +34 + 9 digits NOT starting with 6 or 7 (mobile numbers start with 6 or 7)
            if (!phoneNumber.startsWith('+34')) {
                return false;
            }
            number = phoneNumber.substring(3); // Remove +34
            if (number.length !== 9) {
                return false;
            }
            // Spanish mobile numbers start with 6 or 7
            // If it doesn't start with 6 or 7, it's likely a landline
            return !/^[67]/.test(number);
        }
        default:
            return false;
    }
}
/**
 * Detects if a phone number (in any format) is a landline number.
 * First normalizes the number, then detects the country, then checks if it's a landline.
 * Also checks patterns directly if normalization fails (for cases like Israeli landlines).
 * @param phoneNumber - Phone number in any format
 * @returns true if it's a landline number, false otherwise
 */
function detectLandline(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return false;
    }
    const normalized = (0, normalization_1.normalizePhoneNumber)(phoneNumber);
    if (normalized) {
        const country = (0, country_detection_1.detectCountryFromPhoneNumber)(normalized);
        // If country detection failed but normalization succeeded, try pattern matching
        // This handles cases where we manually normalized numbers the phone library doesn't recognize
        if (!country) {
            // Fall through to pattern matching below
        }
        else {
            return isLandlineNumber(normalized, country);
        }
    }
    // If normalization failed, try pattern matching for known landline formats
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    // Israeli landline patterns: 02X, 03X, 04X, 08X, 09X (9 digits total)
    // or +9722, +9723, +9724, +9728, +9729 (8-9 digits after +972)
    // or 9722, 9723, 9724, 9728, 9729 (11-12 digits total, missing +)
    if (cleaned.startsWith('0') && cleaned.length === 9) {
        const firstDigit = cleaned.charAt(1);
        if (['2', '3', '4', '8', '9'].includes(firstDigit)) {
            // Check it's not a mobile prefix (50, 52, 53, 54, 55, 58)
            const mobilePrefixes = ['50', '52', '53', '54', '55', '58'];
            if (!mobilePrefixes.some((prefix) => cleaned.substring(1).startsWith(prefix))) {
                return true; // Israeli landline
            }
        }
    }
    else if (cleaned.startsWith('+972') &&
        cleaned.length >= 12 &&
        cleaned.length <= 13) {
        // +972 + 8-9 digits
        const afterCountryCode = cleaned.substring(4);
        if (afterCountryCode.length >= 8 && afterCountryCode.length <= 9) {
            const firstDigit = afterCountryCode.charAt(0);
            if (['2', '3', '4', '8', '9'].includes(firstDigit)) {
                // Check it's not a mobile prefix
                const mobilePrefixes = ['50', '52', '53', '54', '55', '58'];
                if (!mobilePrefixes.some((prefix) => afterCountryCode.startsWith(prefix))) {
                    return true; // Israeli landline
                }
            }
        }
    }
    else if (cleaned.startsWith('972') &&
        cleaned.length >= 11 &&
        cleaned.length <= 12) {
        // 972 + 8-9 digits (missing +)
        const afterCountryCode = cleaned.substring(3);
        if (afterCountryCode.length >= 8 && afterCountryCode.length <= 9) {
            const firstDigit = afterCountryCode.charAt(0);
            if (['2', '3', '4', '8', '9'].includes(firstDigit)) {
                // Check it's not a mobile prefix
                const mobilePrefixes = ['50', '52', '53', '54', '55', '58'];
                if (!mobilePrefixes.some((prefix) => afterCountryCode.startsWith(prefix))) {
                    return true; // Israeli landline
                }
            }
        }
    }
    // German landline pattern: 03X (10 digits total)
    if (cleaned.startsWith('03') && cleaned.length === 10) {
        return true; // German landline
    }
    else if (cleaned.startsWith('+49') &&
        cleaned.length >= 11 &&
        cleaned.length <= 14) {
        const afterCountryCode = cleaned.substring(3);
        // German mobile numbers start with 15, 16, 17
        if (!/^1[567]/.test(afterCountryCode)) {
            return true; // German landline
        }
    }
    return false;
}
//# sourceMappingURL=landline-detection.js.map