import { getSupportedCountries } from '../src/country-list'
import { Country } from '../src/types'

describe('getSupportedCountries', () => {
    it('should return all supported countries', () => {
        const countries = getSupportedCountries()
        expect(countries.length).toBeGreaterThan(0)
    })

    it('should include all required countries', () => {
        const countries = getSupportedCountries()
        const codes = countries.map((c) => c.code)

        expect(codes).toContain(Country.IL)
        expect(codes).toContain(Country.DE)
        expect(codes).toContain(Country.IT)
        expect(codes).toContain(Country.GB)
        expect(codes).toContain(Country.FR)
        expect(codes).toContain(Country.ES)
        expect(codes).toContain(Country.AT)
        expect(codes).toContain(Country.CH)
        expect(codes).toContain(Country.NL)
        expect(codes).toContain(Country.BE)
        expect(codes).toContain(Country.PL)
        expect(codes).toContain(Country.CZ)
        expect(codes).toContain(Country.SE)
        expect(codes).toContain(Country.NO)
        expect(codes).toContain(Country.DK)
        expect(codes).toContain(Country.FI)
    })

    it('should have correct structure for each country', () => {
        const countries = getSupportedCountries()

        countries.forEach((country) => {
            expect(country).toHaveProperty('code')
            expect(country).toHaveProperty('name')
            expect(country).toHaveProperty('phoneCode')
            expect(country).toHaveProperty('flag')
            expect(typeof country.name).toBe('string')
            expect(typeof country.phoneCode).toBe('string')
            expect(country.phoneCode).toMatch(/^\+\d+$/)
            expect(typeof country.flag).toBe('string')
        })
    })

    it('should have unique country codes', () => {
        const countries = getSupportedCountries()
        const codes = countries.map((c) => c.code)
        const uniqueCodes = new Set(codes)
        expect(uniqueCodes.size).toBe(codes.length)
    })
})
