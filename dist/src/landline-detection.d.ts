import { Country } from './types';
/**
 * Detects if a normalized E.164 phone number is a landline number for a given country.
 * @param phoneNumber - Normalized E.164 phone number (e.g., +97221234567)
 * @param country - The detected country of the phone number
 * @returns true if it's a landline number, false otherwise
 */
export declare function isLandlineNumber(phoneNumber: string, country: Country | null): boolean;
/**
 * Detects if a phone number (in any format) is a landline number.
 * First normalizes the number, then detects the country, then checks if it's a landline.
 * Also checks patterns directly if normalization fails (for cases like Israeli landlines).
 * @param phoneNumber - Phone number in any format
 * @returns true if it's a landline number, false otherwise
 */
export declare function detectLandline(phoneNumber: string): boolean;
