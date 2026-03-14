"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCountryFromPhoneNumber = detectCountryFromPhoneNumber;
const phone_1 = __importDefault(require("phone"));
const types_1 = require("./types");
/**
 * Maps phone library country codes to our Country enum
 */
const COUNTRY_CODE_MAP = {
    IL: types_1.Country.IL, // +972
    DE: types_1.Country.DE, // +49
    IT: types_1.Country.IT, // +39
    GB: types_1.Country.GB, // +44
    FR: types_1.Country.FR, // +33
    ES: types_1.Country.ES, // +34
    AT: types_1.Country.AT, // +43
    CH: types_1.Country.CH, // +41
    NL: types_1.Country.NL, // +31
    BE: types_1.Country.BE, // +32
    PL: types_1.Country.PL, // +48
    CZ: types_1.Country.CZ, // +420
    SE: types_1.Country.SE, // +46
    NO: types_1.Country.NO, // +47
    DK: types_1.Country.DK, // +45
    FI: types_1.Country.FI, // +358
};
/**
 * Detects the country from a phone number
 * @param phoneNumber - Phone number in any format
 * @returns Country enum value or null if country cannot be detected
 */
function detectCountryFromPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return null;
    }
    try {
        // Try parsing without country hint first (for international format)
        let result = (0, phone_1.default)(phoneNumber);
        // If invalid and starts with 0, try with common country hints
        if (!result.isValid && phoneNumber.startsWith('0')) {
            // Try common European countries for local format numbers
            const countryHints = ['DE', 'IT', 'IL', 'GB', 'FR', 'ES'];
            for (const hint of countryHints) {
                result = (0, phone_1.default)(phoneNumber, { country: hint });
                if (result.isValid) {
                    break;
                }
            }
        }
        if (!result.isValid) {
            return null;
        }
        // Extract country code from the parsed result
        // The phone library returns country code in ISO 3166-1 alpha-2 format
        const countryCode = result.countryIso2?.toUpperCase();
        if (!countryCode || !COUNTRY_CODE_MAP[countryCode]) {
            return null;
        }
        return COUNTRY_CODE_MAP[countryCode];
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=country-detection.js.map