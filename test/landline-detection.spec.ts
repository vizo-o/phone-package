import { detectLandline, isLandlineNumber } from '../src/landline-detection'
import { Country } from '../src/types'

describe('landline detection', () => {
    describe('isLandlineNumber', () => {
        describe('Israeli landline numbers', () => {
            it('should detect Israeli landline numbers correctly', () => {
                expect(isLandlineNumber('+97225340661', Country.IL)).toBe(true) // 8 digits after +972
                expect(isLandlineNumber('+972212345678', Country.IL)).toBe(true) // Jerusalem/Tel Aviv (9 digits)
                expect(isLandlineNumber('+972312345678', Country.IL)).toBe(true) // Haifa (9 digits)
                expect(isLandlineNumber('+972412345678', Country.IL)).toBe(true) // Central (9 digits)
                expect(isLandlineNumber('+972812345678', Country.IL)).toBe(true) // Southern (9 digits)
                expect(isLandlineNumber('+972912345678', Country.IL)).toBe(true) // Northern (9 digits)
            })

            it('should reject Israeli mobile numbers', () => {
                expect(isLandlineNumber('+972501234567', Country.IL)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+972521234567', Country.IL)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+972531234567', Country.IL)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+972541234567', Country.IL)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+972551234567', Country.IL)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+972581234567', Country.IL)).toBe(
                    false,
                ) // Mobile
            })

            it('should reject invalid Israeli numbers', () => {
                expect(isLandlineNumber('+9721234567', Country.IL)).toBe(false) // Too short
                expect(isLandlineNumber('+97250123456789', Country.IL)).toBe(
                    false,
                ) // Too long
                expect(isLandlineNumber('+491701234567', Country.IL)).toBe(
                    false,
                ) // Wrong country code
            })
        })

        describe('German landline numbers', () => {
            it('should detect German landline numbers correctly', () => {
                expect(isLandlineNumber('+49301234567', Country.DE)).toBe(true) // Berlin
                expect(isLandlineNumber('+494012345678', Country.DE)).toBe(true) // Hamburg
                expect(isLandlineNumber('+49891234567', Country.DE)).toBe(true) // Munich
            })

            it('should reject German mobile numbers', () => {
                expect(isLandlineNumber('+491701234567', Country.DE)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+4915123456789', Country.DE)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+4916123456789', Country.DE)).toBe(
                    false,
                ) // Mobile
            })

            it('should reject invalid German numbers', () => {
                expect(isLandlineNumber('+491234567', Country.DE)).toBe(false) // Too short
                expect(isLandlineNumber('+49170123456789', Country.DE)).toBe(
                    false,
                ) // Too long
            })
        })

        describe('Italian landline numbers', () => {
            it('should detect Italian landline numbers correctly', () => {
                expect(isLandlineNumber('+39021234567', Country.IT)).toBe(true) // Milan
                expect(isLandlineNumber('+390612345678', Country.IT)).toBe(true) // Rome
            })

            it('should reject Italian mobile numbers', () => {
                expect(isLandlineNumber('+393912345678', Country.IT)).toBe(
                    false,
                ) // Mobile
                expect(isLandlineNumber('+393321234567', Country.IT)).toBe(
                    false,
                ) // Mobile
            })
        })

        describe('UK landline numbers', () => {
            it('should detect UK landline numbers correctly', () => {
                expect(isLandlineNumber('+442012345678', Country.GB)).toBe(true) // London (10 digits)
                expect(isLandlineNumber('+441612345678', Country.GB)).toBe(true) // Manchester (10 digits)
            })

            it('should reject UK mobile numbers', () => {
                expect(isLandlineNumber('+447911123456', Country.GB)).toBe(
                    false,
                ) // Mobile
            })
        })

        describe('French landline numbers', () => {
            it('should detect French landline numbers correctly', () => {
                expect(isLandlineNumber('+33123456789', Country.FR)).toBe(true) // Paris
                expect(isLandlineNumber('+33412345678', Country.FR)).toBe(true) // Marseille
            })

            it('should reject French mobile numbers', () => {
                expect(isLandlineNumber('+33612345678', Country.FR)).toBe(false) // Mobile
                expect(isLandlineNumber('+33712345678', Country.FR)).toBe(false) // Mobile
            })
        })

        describe('Spanish landline numbers', () => {
            it('should detect Spanish landline numbers correctly', () => {
                expect(isLandlineNumber('+34912345678', Country.ES)).toBe(true) // Madrid
                expect(isLandlineNumber('+34934123456', Country.ES)).toBe(true) // Barcelona
            })

            it('should reject Spanish mobile numbers', () => {
                expect(isLandlineNumber('+34612345678', Country.ES)).toBe(false) // Mobile
                expect(isLandlineNumber('+34712345678', Country.ES)).toBe(false) // Mobile
            })
        })

        describe('edge cases', () => {
            it('should return false for null country', () => {
                expect(isLandlineNumber('+972501234567', null)).toBe(false)
            })

            it('should return false for empty phone number', () => {
                expect(isLandlineNumber('', Country.IL)).toBe(false)
            })
        })
    })

    describe('detectLandline', () => {
        it('should detect Israeli landlines from local format', () => {
            expect(detectLandline('025340661')).toBe(true) // Israeli landline local (9 digits)
            expect(detectLandline('021234567')).toBe(true) // Israeli landline local
            expect(detectLandline('031234567')).toBe(true) // Israeli landline local
        })

        it('should detect Israeli landlines from E.164 format', () => {
            expect(detectLandline('+97225340661')).toBe(true) // 8 digits after +972
            expect(detectLandline('+972212345678')).toBe(true) // 9 digits after +972
            expect(detectLandline('+972312345678')).toBe(true) // 9 digits after +972
        })

        it('should reject Israeli mobiles', () => {
            expect(detectLandline('0501234567')).toBe(false) // Israeli mobile local
            expect(detectLandline('+972501234567')).toBe(false) // Israeli mobile E.164
        })

        it('should detect German landlines from E.164 format', () => {
            expect(isLandlineNumber('+49301234567', Country.DE)).toBe(true)
        })

        it('should reject German mobiles', () => {
            expect(detectLandline('01701234567')).toBe(false) // German mobile local
            expect(detectLandline('+491701234567')).toBe(false) // German mobile E.164
        })

        it('should return false for invalid numbers', () => {
            expect(detectLandline('invalid')).toBe(false)
            expect(detectLandline('123')).toBe(false)
            expect(detectLandline('')).toBe(false)
        })
    })
})
