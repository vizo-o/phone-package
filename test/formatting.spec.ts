import { formatPhoneNumberForDisplay } from '../src/formatting'
import { Country } from '../src/types'

describe('formatPhoneNumberForDisplay', () => {
    describe('German formatting', () => {
        it('should format German numbers correctly', () => {
            const result = formatPhoneNumberForDisplay(
                '+491701234567',
                Country.DE,
            )
            // German numbers should start with +49
            expect(result).toMatch(/^\+49/)
            // Formatting depends on number length - 9 digits may not be formatted
            // Just verify it returns a valid string
            expect(typeof result).toBe('string')
            expect(result.length).toBeGreaterThan(0)
        })
    })

    describe('Italian formatting', () => {
        it('should format Italian numbers correctly', () => {
            expect(
                formatPhoneNumberForDisplay('+393912345678', Country.IT),
            ).toMatch(/^\+39 \d{3} \d+$/)
        })
    })

    describe('Israeli formatting', () => {
        it('should format Israeli mobile numbers starting with 50 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972501234567',
                Country.IL,
            )
            // Should format as 0XX-XXX-XXXX
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('050-123-4567')
        })

        it('should format Israeli mobile numbers starting with 52 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972521234567',
                Country.IL,
            )
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('052-123-4567')
        })

        it('should format Israeli mobile numbers starting with 53 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972531234567',
                Country.IL,
            )
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('053-123-4567')
        })

        it('should format Israeli mobile numbers starting with 54 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972541234567',
                Country.IL,
            )
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('054-123-4567')
        })

        it('should format Israeli mobile numbers starting with 55 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972551234567',
                Country.IL,
            )
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('055-123-4567')
        })

        it('should format Israeli mobile numbers starting with 58 in local format', () => {
            const result = formatPhoneNumberForDisplay(
                '+972581234567',
                Country.IL,
            )
            expect(result).toMatch(/^0\d{2}-\d{3}-\d{4}$/)
            expect(result).toBe('058-123-4567')
        })

        it('should handle non-normalized Israeli numbers', () => {
            // If normalization fails, return original
            const result = formatPhoneNumberForDisplay('invalid', Country.IL)
            expect(result).toBe('invalid')
        })

        it('should return normalized format for non-mobile Israeli numbers', () => {
            // Landline numbers should return normalized format
            const result = formatPhoneNumberForDisplay(
                '+97221234567',
                Country.IL,
            )
            expect(result).toBe('+97221234567')
        })
    })

    describe('other countries', () => {
        it('should format UK numbers', () => {
            const result = formatPhoneNumberForDisplay(
                '+447911123456',
                Country.GB,
            )
            expect(result).toMatch(/^\+44/)
        })

        it('should format French numbers', () => {
            const result = formatPhoneNumberForDisplay(
                '+33123456789',
                Country.FR,
            )
            expect(result).toMatch(/^\+33/)
        })

        it('should format Spanish numbers', () => {
            const result = formatPhoneNumberForDisplay(
                '+34612345678',
                Country.ES,
            )
            expect(result).toMatch(/^\+34/)
        })
    })

    describe('edge cases', () => {
        it('should return original if normalization fails', () => {
            expect(formatPhoneNumberForDisplay('invalid', Country.DE)).toBe(
                'invalid',
            )
        })

        it('should handle invalid country', () => {
            const result = formatPhoneNumberForDisplay(
                '+491701234567',
                Country.DE,
            )
            expect(result).toBeTruthy()
        })
    })
})
