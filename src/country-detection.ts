import phone from 'phone'
import { Country } from './types'

/**
 * Maps phone library country codes to our Country enum
 */
const COUNTRY_CODE_MAP: Record<string, Country> = {
    IL: Country.IL, // +972
    DE: Country.DE, // +49
    IT: Country.IT, // +39
    GB: Country.GB, // +44
    FR: Country.FR, // +33
    ES: Country.ES, // +34
    AT: Country.AT, // +43
    CH: Country.CH, // +41
    NL: Country.NL, // +31
    BE: Country.BE, // +32
    PL: Country.PL, // +48
    CZ: Country.CZ, // +420
    SE: Country.SE, // +46
    NO: Country.NO, // +47
    DK: Country.DK, // +45
    FI: Country.FI, // +358
}

/**
 * Detects the country from a phone number
 * @param phoneNumber - Phone number in any format
 * @returns Country enum value or null if country cannot be detected
 */
export function detectCountryFromPhoneNumber(
    phoneNumber: string,
): Country | null {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return null
    }

    try {
        // Try parsing without country hint first (for international format)
        let result = phone(phoneNumber)

        // If invalid and starts with 0, try with common country hints
        if (!result.isValid && phoneNumber.startsWith('0')) {
            // Try common European countries for local format numbers
            const countryHints = ['DE', 'IT', 'IL', 'GB', 'FR', 'ES']
            for (const hint of countryHints) {
                result = phone(phoneNumber, { country: hint })
                if (result.isValid) {
                    break
                }
            }
        }

        if (!result.isValid) {
            return null
        }

        // Extract country code from the parsed result
        // The phone library returns country code in ISO 3166-1 alpha-2 format
        const countryCode = result.countryIso2?.toUpperCase()

        if (!countryCode || !COUNTRY_CODE_MAP[countryCode]) {
            return null
        }

        return COUNTRY_CODE_MAP[countryCode]
    } catch (error) {
        return null
    }
}
