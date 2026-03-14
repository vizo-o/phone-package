import { normalizePhoneNumber } from '../src/normalization'

describe('normalizePhoneNumber', () => {
    describe('E.164 format', () => {
        it('should return E.164 format as-is', () => {
            expect(normalizePhoneNumber('+491701234567')).toBe('+491701234567')
            expect(normalizePhoneNumber('+393912345678')).toBe('+393912345678')
            expect(normalizePhoneNumber('+972501234567')).toBe('+972501234567')
        })
    })

    describe('local format', () => {
        it('should normalize German mobile local format', () => {
            // German mobile numbers: 0170... format
            const result = normalizePhoneNumber('01701234567')
            expect(result).toBeTruthy()
            if (result) {
                expect(result).toMatch(/^\+49/)
                expect(result).toBe('+491701234567')
            }
        })

        it('should normalize German landline local format (03X)', () => {
            // Bug fix: German landlines starting with 03X should normalize to German, not Italian
            // e.g., 0301234567 should be +49301234567, not +39301234567
            const result = normalizePhoneNumber('0301234567')
            expect(result).toBeTruthy()
            expect(result).toBe('+49301234567')
            // Ensure it's German, not Italian
            expect(result).toMatch(/^\+49/)
            expect(result).not.toMatch(/^\+39/)
        })

        it('should normalize Italian mobile local format (3X)', () => {
            // Bug fix: Italian mobile numbers starting with 3X should normalize correctly
            // e.g., 3912345678 should normalize to +393912345678
            const result = normalizePhoneNumber('3912345678')
            expect(result).toBeTruthy()
            expect(result).toBe('+393912345678')
            expect(result).toMatch(/^\+39/)
        })

        it('should normalize Italian E.164 format', () => {
            // Italian numbers in E.164 format should remain as-is
            const result = normalizePhoneNumber('+393912345678')
            expect(result).toBeTruthy()
            if (result) {
                expect(result).toMatch(/^\+39/)
                expect(result).toBe('+393912345678')
            }
        })

        it('should normalize Israeli local format', () => {
            // Israeli mobile numbers: 050... format
            const result = normalizePhoneNumber('0501234567')
            expect(result).toBeTruthy()
            if (result) {
                expect(result).toMatch(/^\+972/)
                expect(result).toBe('+972501234567')
            }
        })
    })

    describe('E.164 format missing leading +', () => {
        it('should normalize Israeli number missing leading +', () => {
            expect(normalizePhoneNumber('972546398920')).toBe('+972546398920')
        })

        it('should normalize Israeli mobile number missing leading + (52 prefix)', () => {
            // Bug fix: Israeli mobile numbers starting with 52 should normalize correctly
            // e.g., 972526411575 should normalize to +972526411575
            expect(normalizePhoneNumber('972526411575')).toBe('+972526411575')
        })

        it('should normalize German number missing leading +', () => {
            expect(normalizePhoneNumber('491701234567')).toBe('+491701234567')
        })

        it('should normalize Italian number missing leading +', () => {
            expect(normalizePhoneNumber('393912345678')).toBe('+393912345678')
        })

        it('should normalize UK number missing leading +', () => {
            expect(normalizePhoneNumber('447911123456')).toBe('+447911123456')
        })
    })

    describe('various input formats', () => {
        it('should handle numbers with spaces', () => {
            expect(normalizePhoneNumber('+49 170 1234567')).toBe(
                '+491701234567',
            )
            expect(normalizePhoneNumber('+39 391 234 5678')).toBe(
                '+393912345678',
            )
        })

        it('should handle numbers with dashes', () => {
            expect(normalizePhoneNumber('+972-50-123-4567')).toBe(
                '+972501234567',
            )
            expect(normalizePhoneNumber('+49-170-1234567')).toBe(
                '+491701234567',
            )
        })

        it('should handle numbers with parentheses', () => {
            expect(normalizePhoneNumber('+49 (170) 1234567')).toBe(
                '+491701234567',
            )
        })

        it('should handle mixed formatting', () => {
            expect(normalizePhoneNumber('+49 170-123 4567')).toBe(
                '+491701234567',
            )
        })
    })

    describe('invalid inputs', () => {
        it('should return null for invalid numbers', () => {
            expect(normalizePhoneNumber('123')).toBeNull()
            expect(normalizePhoneNumber('invalid')).toBeNull()
            expect(normalizePhoneNumber('')).toBeNull()
        })

        it('should return null for null and undefined', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(normalizePhoneNumber(null as any)).toBeNull()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(normalizePhoneNumber(undefined as any)).toBeNull()
        })
    })
})
