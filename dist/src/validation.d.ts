import type { Country } from './types';
/**
 * Validates a phone number (accepts both local and E.164 formats)
 * @param phoneNumber - Phone number to validate
 * @param allowedCountries - Optional array of allowed countries. If provided, validates that the number belongs to one of these countries.
 * @returns true if the phone number is valid, false otherwise
 */
export declare function validatePhoneNumber(phoneNumber: string, allowedCountries?: Country[]): boolean;
