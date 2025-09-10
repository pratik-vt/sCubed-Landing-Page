// Utility functions for phone formatting - React 19 compatible alternatives
// These replace @react-input/mask functions temporarily until the library is updated for React 19

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const unformatPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};