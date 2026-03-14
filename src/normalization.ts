import phone from 'phone'

/**
 * Normalizes a phone number to E.164 format (+[country][number])
 * @param phoneNumber - Phone number in any format
 * @returns Normalized phone number in E.164 format, or null if invalid
 */
export function normalizePhoneNumber(phoneNumber: string): string | null {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return null
    }

    try {
        // Remove all non-digit characters except leading +
        const cleaned = phoneNumber.replace(/[^\d+]/g, '')

        let result

        // Special handling for 03X numbers: always prefer German format
        // Check this BEFORE the initial phone() call to avoid Italian matches
        if (cleaned.startsWith('03') && cleaned.length === 10) {
            // 11-digit numbers starting with 03X are likely German landlines (e.g., 0301234567)
            // German landlines: remove leading 0, add +49
            // e.g., 0301234567 -> +49301234567
            // Always use German format for 03X numbers, even if phone library matches Italian
            const withoutLeadingZero = cleaned.substring(1) // Remove the 0: 301234567
            const manuallyNormalized = `+49${withoutLeadingZero}` // +49301234567

            // Always return manually constructed German format for 03X numbers
            // The phone library often matches these as Italian, but we prefer German
            result = {
                isValid: true,
                phoneNumber: manuallyNormalized,
                countryIso2: 'DE',
                countryIso3: 'DEU',
                countryCode: '49',
            }
        } else {
            // Try parsing without country hint first (for international format)
            result = phone(cleaned)

            // Additional validation: if a number starts with a known country code (without +)
            // but was normalized to a different country, reject it.
            // e.g., 9725463989 (10 digits) shouldn't be matched as US +19725463989
            const knownCountryCodes: Record<
                string,
                { minLength: number; maxLength: number; country: string }
            > = {
                '972': { minLength: 11, maxLength: 12, country: 'IL' }, // Israel: 972 (3) + 8-9 digits = 11-12 total (landlines can be 8 digits, mobiles 9)
                '49': { minLength: 11, maxLength: 13, country: 'DE' }, // Germany: 49 (2) + 8-11 digits = 10-13 total
                '39': { minLength: 12, maxLength: 13, country: 'IT' }, // Italy: 39 (2) + 9-10 digits = 11-12 total (mobile 12)
                '44': { minLength: 12, maxLength: 13, country: 'GB' }, // UK: 44 (2) + 9-10 digits = 11-12 total
                '33': { minLength: 12, maxLength: 12, country: 'FR' }, // France: 33 (2) + 9 digits = 11 total
                '34': { minLength: 12, maxLength: 12, country: 'ES' }, // Spain: 34 (2) + 9 digits = 11 total
            }

            // If result is valid, check if it's incorrectly matching a known country code
            if (
                result.isValid &&
                result.phoneNumber &&
                !cleaned.startsWith('+')
            ) {
                for (const [
                    code,
                    { minLength, maxLength, country },
                ] of Object.entries(knownCountryCodes)) {
                    if (cleaned.startsWith(code)) {
                        // Check if length is correct for this country code
                        const isValidLength =
                            cleaned.length >= minLength &&
                            cleaned.length <= maxLength
                        // Check if the matched country is wrong
                        const matchedWrongCountry =
                            result.countryIso2 !== country &&
                            result.countryIso2 !== null
                        // If length is wrong or country is wrong, invalidate the result
                        if (!isValidLength || matchedWrongCountry) {
                            result = { isValid: false, phoneNumber: null }
                            break
                        }
                    }
                }
            }

            // Special handling for Israeli numbers (landlines and mobiles) that phone() might not normalize correctly
            // e.g., 97225340661 (11 digits) or +97225340661 (12 digits with +)
            // Israeli landlines can be 8 or 9 digits after country code
            // Israeli mobiles are 9 digits after country code
            if (
                !result.isValid &&
                cleaned.startsWith('972') &&
                (cleaned.length === 11 || cleaned.length === 12)
            ) {
                const afterCountryCode = cleaned.substring(3)
                // Check if it's a landline prefix (2, 3, 4, 8, 9) and not mobile (50, 52, 53, 54, 55, 58)
                if (
                    afterCountryCode.length >= 8 &&
                    afterCountryCode.length <= 9 &&
                    ['2', '3', '4', '8', '9'].includes(
                        afterCountryCode.charAt(0),
                    )
                ) {
                    const mobilePrefixes = ['50', '52', '53', '54', '55', '58']
                    if (
                        !mobilePrefixes.some((prefix) =>
                            afterCountryCode.startsWith(prefix),
                        )
                    ) {
                        // Manually construct E.164 format for Israeli landline
                        const withPlus = cleaned.startsWith('+')
                            ? cleaned
                            : `+${cleaned}`
                        const tempResult = phone(withPlus, { country: 'IL' })
                        if (tempResult.isValid) {
                            result = tempResult
                        } else {
                            // If phone library still rejects it, manually construct it
                            result = {
                                isValid: true,
                                phoneNumber: withPlus,
                                countryIso2: 'IL',
                                countryIso3: 'ISR',
                                countryCode: '972',
                            }
                        }
                    }
                }
                // Handle Israeli mobile numbers (50, 52, 53, 54, 55, 58)
                if (!result.isValid && afterCountryCode.length === 9) {
                    const mobilePrefixes = ['50', '52', '53', '54', '55', '58']
                    if (
                        mobilePrefixes.some((prefix) =>
                            afterCountryCode.startsWith(prefix),
                        )
                    ) {
                        // Manually construct E.164 format for Israeli mobile
                        const withPlus = cleaned.startsWith('+')
                            ? cleaned
                            : `+${cleaned}`
                        const tempResult = phone(withPlus, { country: 'IL' })
                        if (tempResult.isValid) {
                            result = tempResult
                        } else {
                            // If phone library still rejects it, manually construct it
                            result = {
                                isValid: true,
                                phoneNumber: withPlus,
                                countryIso2: 'IL',
                                countryIso3: 'ISR',
                                countryCode: '972',
                            }
                        }
                    }
                }
            }

            // If invalid and doesn't start with +, try prepending + for known country codes
            if (!result.isValid && !cleaned.startsWith('+')) {
                // Known country codes that might be missing the +
                const knownCountryCodesList = [
                    '972',
                    '49',
                    '39',
                    '44',
                    '33',
                    '34',
                ]
                for (const code of knownCountryCodesList) {
                    if (cleaned.startsWith(code)) {
                        // Check length before trying to normalize
                        const codeInfo = knownCountryCodes[code]
                        if (
                            codeInfo &&
                            cleaned.length >= codeInfo.minLength &&
                            cleaned.length <= codeInfo.maxLength
                        ) {
                            const withPlus = `+${cleaned}`
                            result = phone(withPlus)
                            if (result.isValid) {
                                break
                            }
                        }
                    }
                }
            }

            // If still invalid, try with common country hints
            // Order matters: try countries that are less ambiguous first
            if (!result.isValid) {
                if (cleaned.startsWith('0')) {
                    // Local format numbers starting with 0
                    // Other local format numbers
                    const countryHints = ['IL', 'DE', 'GB', 'FR', 'IT', 'ES']
                    for (const hint of countryHints) {
                        result = phone(cleaned, { country: hint })
                        if (result.isValid) {
                            break
                        }
                    }
                } else if (/^3[0-9]/.test(cleaned) && cleaned.length >= 9) {
                    // Numbers starting with 3X that are 9+ digits might be Italian mobile
                    // Try IT first, then other countries
                    const countryHints = ['IT', 'DE', 'ES', 'FR', 'GB']
                    for (const hint of countryHints) {
                        result = phone(cleaned, { country: hint })
                        if (result.isValid) {
                            break
                        }
                    }
                } else if (!cleaned.startsWith('+') && cleaned.length >= 9) {
                    // Try prepending + and validating for numbers that might be missing it
                    const withPlus = `+${cleaned}`
                    result = phone(withPlus)
                    if (!result.isValid) {
                        // Try with country hints
                        const countryHints = [
                            'IL',
                            'DE',
                            'IT',
                            'GB',
                            'FR',
                            'ES',
                        ]
                        for (const hint of countryHints) {
                            result = phone(withPlus, { country: hint })
                            if (result.isValid) {
                                break
                            }
                        }
                    }
                }
            }
        }

        if (!result.isValid || !result.phoneNumber) {
            return null
        }

        // Return in E.164 format
        return result.phoneNumber
    } catch (error) {
        return null
    }
}
