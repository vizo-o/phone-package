import { Country } from './types';
/**
 * Detects the country from a phone number
 * @param phoneNumber - Phone number in any format
 * @returns Country enum value or null if country cannot be detected
 */
export declare function detectCountryFromPhoneNumber(phoneNumber: string): Country | null;
