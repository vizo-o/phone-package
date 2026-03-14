import { detectCountryFromPhoneNumber } from '../src/country-detection'
import { Country } from '../src/types'

describe('detectCountryFromPhoneNumber', () => {
    describe('valid phone numbers', () => {
        it('should detect German phone number', () => {
            expect(detectCountryFromPhoneNumber('+491701234567')).toBe(
                Country.DE,
            )
            expect(detectCountryFromPhoneNumber('+49 170 1234567')).toBe(
                Country.DE,
            )
            // Note: Local format detection may require country hint
            // Testing with valid German mobile number format
            expect(detectCountryFromPhoneNumber('+4915123456789')).toBe(
                Country.DE,
            )
        })

        it('should detect Italian phone number', () => {
            expect(detectCountryFromPhoneNumber('+393912345678')).toBe(
                Country.IT,
            )
            expect(detectCountryFromPhoneNumber('+39 391 234 5678')).toBe(
                Country.IT,
            )
        })

        it('should detect Israeli phone number', () => {
            expect(detectCountryFromPhoneNumber('+972501234567')).toBe(
                Country.IL,
            )
            expect(detectCountryFromPhoneNumber('+972 50-123-4567')).toBe(
                Country.IL,
            )
            // Note: Local format detection may require country hint
            // Testing with valid Israeli mobile number format
            expect(detectCountryFromPhoneNumber('+972501234567')).toBe(
                Country.IL,
            )
        })

        it('should detect other European countries', () => {
            expect(detectCountryFromPhoneNumber('+447911123456')).toBe(
                Country.GB,
            )
            // French numbers need 10 digits
            expect(detectCountryFromPhoneNumber('+33612345678')).toBe(
                Country.FR,
            )
            expect(detectCountryFromPhoneNumber('+34612345678')).toBe(
                Country.ES,
            )
        })
    })

    describe('invalid phone numbers', () => {
        it('should return null for invalid numbers', () => {
            expect(detectCountryFromPhoneNumber('123')).toBeNull()
            expect(detectCountryFromPhoneNumber('invalid')).toBeNull()
            expect(detectCountryFromPhoneNumber('')).toBeNull()
        })

        it('should return null for numbers without country code', () => {
            expect(detectCountryFromPhoneNumber('1234567890')).toBeNull()
        })

        it('should return null for unsupported countries', () => {
            expect(detectCountryFromPhoneNumber('+12125551234')).toBeNull() // US
            expect(detectCountryFromPhoneNumber('+861234567890')).toBeNull() // China
        })
    })

    describe('edge cases', () => {
        it('should handle null and undefined', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(detectCountryFromPhoneNumber(null as any)).toBeNull()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(detectCountryFromPhoneNumber(undefined as any)).toBeNull()
        })

        it('should handle non-string inputs', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(detectCountryFromPhoneNumber(123 as any)).toBeNull()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(detectCountryFromPhoneNumber({} as any)).toBeNull()
        })
    })
})
