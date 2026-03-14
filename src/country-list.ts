import { Country } from './types'

export interface SupportedCountry {
    code: Country
    name: string
    phoneCode: string
    flag: string
}

/**
 * Returns list of supported countries with their metadata
 * @returns Array of supported country objects
 */
export function getSupportedCountries(): SupportedCountry[] {
    return [
        {
            code: Country.IL,
            name: 'Israel',
            phoneCode: '+972',
            flag: '🇮🇱',
        },
        {
            code: Country.DE,
            name: 'Germany',
            phoneCode: '+49',
            flag: '🇩🇪',
        },
        {
            code: Country.IT,
            name: 'Italy',
            phoneCode: '+39',
            flag: '🇮🇹',
        },
        {
            code: Country.GB,
            name: 'United Kingdom',
            phoneCode: '+44',
            flag: '🇬🇧',
        },
        {
            code: Country.FR,
            name: 'France',
            phoneCode: '+33',
            flag: '🇫🇷',
        },
        {
            code: Country.ES,
            name: 'Spain',
            phoneCode: '+34',
            flag: '🇪🇸',
        },
        {
            code: Country.AT,
            name: 'Austria',
            phoneCode: '+43',
            flag: '🇦🇹',
        },
        {
            code: Country.CH,
            name: 'Switzerland',
            phoneCode: '+41',
            flag: '🇨🇭',
        },
        {
            code: Country.NL,
            name: 'Netherlands',
            phoneCode: '+31',
            flag: '🇳🇱',
        },
        {
            code: Country.BE,
            name: 'Belgium',
            phoneCode: '+32',
            flag: '🇧🇪',
        },
        {
            code: Country.PL,
            name: 'Poland',
            phoneCode: '+48',
            flag: '🇵🇱',
        },
        {
            code: Country.CZ,
            name: 'Czech Republic',
            phoneCode: '+420',
            flag: '🇨🇿',
        },
        {
            code: Country.SE,
            name: 'Sweden',
            phoneCode: '+46',
            flag: '🇸🇪',
        },
        {
            code: Country.NO,
            name: 'Norway',
            phoneCode: '+47',
            flag: '🇳🇴',
        },
        {
            code: Country.DK,
            name: 'Denmark',
            phoneCode: '+45',
            flag: '🇩🇰',
        },
        {
            code: Country.FI,
            name: 'Finland',
            phoneCode: '+358',
            flag: '🇫🇮',
        },
    ]
}
