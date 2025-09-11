import { Track } from '@react-input/mask';

/**
 * Formats Tax ID input to XX-XXXXXXX format
 */
export const formatTaxId = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/\D/g, '');

  // Limit to 9 digits maximum
  const limited = digitsOnly.substring(0, 9);

  // Add hyphen after 2 digits
  if (limited.length > 2) {
    return `${limited.substring(0, 2)}-${limited.substring(2)}`;
  }

  return limited;
};

/**
 * Formats NPI input to remove non-digits and limit to 10 digits
 */
export const formatNPI = (value: string): string => {
  // Remove all non-digits and limit to 10 digits
  return value.replace(/\D/g, '').substring(0, 10);
};

/**
 * Phone number input tracking for InputMask
 */
export const phoneTrack: Track = ({
  inputType,
  value,
  data,
  selectionStart,
  selectionEnd,
}) => {
  if (inputType === 'insert' && !/^\D*1/.test(data) && selectionStart <= 1) {
    return `1${data}`;
  }
  if (
    inputType !== 'insert' &&
    selectionStart <= 1 &&
    selectionEnd < value.length
  ) {
    if (selectionEnd > 2) return '1';
    if (selectionEnd === 2) return false;
  }
  return data;
};
