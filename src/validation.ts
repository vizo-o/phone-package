import { detectCountryFromPhoneNumber } from './country-detection'
import { normalizePhoneNumber } from './normalization'
import type { Country } from './types'

/**
 * Validates a phone number (accepts both local and E.164 formats)
 * @param phoneNumber - Phone number to validate
 * @param allowedCountries - Optional array of allowed countries. If provided, validates that the number belongs to one of these countries.
 * @returns true if the phone number is valid, false otherwise
 */
export function validatePhoneNumber(
    phoneNumber: string,
    allowedCountries?: Country[],
): boolean {
    // Normalize first - if normalization succeeds, the number is valid
    const normalized = normalizePhoneNumber(phoneNumber)

    if (!normalized) {
        return false
    }

    // If allowedCountries is provided, check if the detected country is in the list
    if (allowedCountries && allowedCountries.length > 0) {
        const detectedCountry = detectCountryFromPhoneNumber(normalized)
        if (!detectedCountry || !allowedCountries.includes(detectedCountry)) {
            return false
        }
    }

    return true
}
