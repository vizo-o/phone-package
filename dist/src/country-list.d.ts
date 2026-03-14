import { Country } from './types';
export interface SupportedCountry {
    code: Country;
    name: string;
    phoneCode: string;
    flag: string;
}
/**
 * Returns list of supported countries with their metadata
 * @returns Array of supported country objects
 */
export declare function getSupportedCountries(): SupportedCountry[];
