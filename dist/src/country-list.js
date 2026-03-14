"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedCountries = getSupportedCountries;
const types_1 = require("./types");
/**
 * Returns list of supported countries with their metadata
 * @returns Array of supported country objects
 */
function getSupportedCountries() {
    return [
        {
            code: types_1.Country.IL,
            name: 'Israel',
            phoneCode: '+972',
            flag: '🇮🇱',
        },
        {
            code: types_1.Country.DE,
            name: 'Germany',
            phoneCode: '+49',
            flag: '🇩🇪',
        },
        {
            code: types_1.Country.IT,
            name: 'Italy',
            phoneCode: '+39',
            flag: '🇮🇹',
        },
        {
            code: types_1.Country.GB,
            name: 'United Kingdom',
            phoneCode: '+44',
            flag: '🇬🇧',
        },
        {
            code: types_1.Country.FR,
            name: 'France',
            phoneCode: '+33',
            flag: '🇫🇷',
        },
        {
            code: types_1.Country.ES,
            name: 'Spain',
            phoneCode: '+34',
            flag: '🇪🇸',
        },
        {
            code: types_1.Country.AT,
            name: 'Austria',
            phoneCode: '+43',
            flag: '🇦🇹',
        },
        {
            code: types_1.Country.CH,
            name: 'Switzerland',
            phoneCode: '+41',
            flag: '🇨🇭',
        },
        {
            code: types_1.Country.NL,
            name: 'Netherlands',
            phoneCode: '+31',
            flag: '🇳🇱',
        },
        {
            code: types_1.Country.BE,
            name: 'Belgium',
            phoneCode: '+32',
            flag: '🇧🇪',
        },
        {
            code: types_1.Country.PL,
            name: 'Poland',
            phoneCode: '+48',
            flag: '🇵🇱',
        },
        {
            code: types_1.Country.CZ,
            name: 'Czech Republic',
            phoneCode: '+420',
            flag: '🇨🇿',
        },
        {
            code: types_1.Country.SE,
            name: 'Sweden',
            phoneCode: '+46',
            flag: '🇸🇪',
        },
        {
            code: types_1.Country.NO,
            name: 'Norway',
            phoneCode: '+47',
            flag: '🇳🇴',
        },
        {
            code: types_1.Country.DK,
            name: 'Denmark',
            phoneCode: '+45',
            flag: '🇩🇰',
        },
        {
            code: types_1.Country.FI,
            name: 'Finland',
            phoneCode: '+358',
            flag: '🇫🇮',
        },
    ];
}
//# sourceMappingURL=country-list.js.map