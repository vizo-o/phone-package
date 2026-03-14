"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumberForDisplay = formatPhoneNumberForDisplay;
exports.formatPhoneNumber = formatPhoneNumber;
const country_detection_1 = require("./country-detection");
const normalization_1 = require("./normalization");
const types_1 = require("./types");
/**
 * Formats a phone number for display based on country conventions
 * @param phoneNumber - Phone number in any format
 * @param country - Country to format for
 * @returns Formatted phone number string
 */
function formatPhoneNumberForDisplay(phoneNumber, country) {
    // First normalize to E.164 format
    const normalized = (0, normalization_1.normalizePhoneNumber)(phoneNumber);
    if (!normalized) {
        return phoneNumber; // Return original if normalization fails
    }
    // Extract country code and number
    // Check known country codes first to avoid incorrect matches (e.g., +491 should be +49, not +491)
    const knownCountryCodes = ['+972', '+49', '+39', '+44', '+33', '+34'];
    let countryCode;
    let number;
    for (const code of knownCountryCodes) {
        if (normalized.startsWith(code)) {
            countryCode = code;
            number = normalized.substring(code.length);
            break;
        }
    }
    // Fallback to regex if no known country code matches
    if (!countryCode || !number) {
        const match = normalized.match(/^(\+\d{1,3})(.+)$/);
        if (!match) {
            return normalized;
        }
        countryCode = match[1]; // e.g., +972, +49, +39
        number = match[2]; // digits after country code
    }
    switch (country) {
        case types_1.Country.DE:
            // German format: +49 XXX XXXXXXX
            // Mobile numbers (15X, 16X, 17X) use 3-digit prefix, landlines vary
            if (number.length >= 10) {
                // Mobile numbers start with 15, 16, or 17 - use 3-digit prefix
                if (/^1[567]/.test(number) && number.length >= 10) {
                    const areaCode = number.substring(0, 3);
                    const rest = number.substring(3);
                    return `+49 ${areaCode} ${rest}`;
                }
                // For other numbers, use variable length based on total length
                const areaCode = number.substring(0, number.length === 11 ? 3 : number.length === 10 ? 2 : 3);
                const rest = number.substring(areaCode.length);
                return `+49 ${areaCode} ${rest}`;
            }
            return normalized;
        case types_1.Country.IT:
            // Italian format: +39 XXX XXXXXXX
            if (number.length >= 9) {
                const areaCode = number.substring(0, 3);
                const rest = number.substring(3);
                return `+39 ${areaCode} ${rest}`;
            }
            return normalized;
        case types_1.Country.IL:
            // Israeli format: 0XX-XXX-XXXX (local format)
            // Israeli mobile numbers: +972 XX-XXX-XXXX (9 digits, starts with 50, 52, 53, 54, 55, 58)
            if (countryCode === '+972') {
                // Check if it's a mobile number (starts with 50, 52, 53, 54, 55, 58)
                const mobilePrefixes = ['50', '52', '53', '54', '55', '58'];
                if (number.length === 9 &&
                    mobilePrefixes.some((prefix) => number.startsWith(prefix))) {
                    // Format as 0XX-XXX-XXXX (add 0 prefix, format with dashes)
                    return `0${number.substring(0, 2)}-${number.substring(2, 5)}-${number.substring(5)}`;
                }
                // For other Israeli numbers, return normalized format
                return normalized;
            }
            // Fallback to international format if not Israeli number
            return normalized;
        case types_1.Country.GB:
            // UK format: +44 XXXX XXXXXX
            if (number.length >= 10) {
                return `+44 ${number.substring(0, 4)} ${number.substring(4)}`;
            }
            return normalized;
        case types_1.Country.FR:
            // French format: +33 X XX XX XX XX
            if (number.length === 9) {
                return `+33 ${number.substring(0, 1)} ${number.substring(1, 3)} ${number.substring(3, 5)} ${number.substring(5, 7)} ${number.substring(7)}`;
            }
            return normalized;
        case types_1.Country.ES:
            // Spanish format: +34 XXX XXX XXX
            if (number.length === 9) {
                return `+34 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
            }
            return normalized;
        default:
            // Default: return E.164 format
            return normalized;
    }
}
/**
 * Formats a phone number for display, auto-detecting the country
 * @param phoneNumber - Phone number in any format
 * @returns Formatted phone number string
 */
function formatPhoneNumber(phoneNumber) {
    const country = (0, country_detection_1.detectCountryFromPhoneNumber)(phoneNumber);
    if (country) {
        return formatPhoneNumberForDisplay(phoneNumber, country);
    }
    // Fallback: return normalized E.164 format or original
    const normalized = (0, normalization_1.normalizePhoneNumber)(phoneNumber);
    return normalized || phoneNumber;
}
//# sourceMappingURL=formatting.js.map