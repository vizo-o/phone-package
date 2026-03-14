import { Country } from './types';
/**
 * Formats a phone number for display based on country conventions
 * @param phoneNumber - Phone number in any format
 * @param country - Country to format for
 * @returns Formatted phone number string
 */
export declare function formatPhoneNumberForDisplay(phoneNumber: string, country: Country): string;
/**
 * Formats a phone number for display, auto-detecting the country
 * @param phoneNumber - Phone number in any format
 * @returns Formatted phone number string
 */
export declare function formatPhoneNumber(phoneNumber: string): string;
