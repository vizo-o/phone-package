"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = validatePhoneNumber;
const country_detection_1 = require("./country-detection");
const normalization_1 = require("./normalization");
/**
 * Validates a phone number (accepts both local and E.164 formats)
 * @param phoneNumber - Phone number to validate
 * @param allowedCountries - Optional array of allowed countries. If provided, validates that the number belongs to one of these countries.
 * @returns true if the phone number is valid, false otherwise
 */
function validatePhoneNumber(phoneNumber, allowedCountries) {
    // Normalize first - if normalization succeeds, the number is valid
    const normalized = (0, normalization_1.normalizePhoneNumber)(phoneNumber);
    if (!normalized) {
        return false;
    }
    // If allowedCountries is provided, check if the detected country is in the list
    if (allowedCountries && allowedCountries.length > 0) {
        const detectedCountry = (0, country_detection_1.detectCountryFromPhoneNumber)(normalized);
        if (!detectedCountry || !allowedCountries.includes(detectedCountry)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=validation.js.map