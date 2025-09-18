// Field mapping from API field names to form field names
export const API_TO_FORM_FIELD_MAP: Record<string, string> = {
  'clinic_name': 'clinicName',
  'tax_id': 'taxId',
  'npi': 'npi',
  'address_line_1': 'addressLine1',
  'address_line_2': 'addressLine2',
  'state': 'state',
  'state_id': 'state',
  'city': 'city',
  'city_id': 'city',
  'zip_code': 'zipCode',
  'full_name': 'fullName',
  'contact_name': 'fullName',
  'email': 'email',
  'contact_email': 'email',
  'phone_number': 'phoneNumber',
  'contact_phone': 'phoneNumber',
};

// Required fields for form validation
export const REQUIRED_FIELDS = [
  'clinicName',
  'taxId',
  'npi',
  'addressLine1',
  'state',
  'city',
  'zipCode',
  'fullName',
  'email',
  'phoneNumber',
] as const;

// Error message keyword to field mapping
export const ERROR_KEYWORD_TO_FIELD: Array<{ keywords: string[]; field: string }> = [
  { keywords: ['zip code'], field: 'zipCode' },
  { keywords: ['email'], field: 'email' },
  { keywords: ['phone'], field: 'phoneNumber' },
  { keywords: ['tax id'], field: 'taxId' },
  { keywords: ['npi'], field: 'npi' },
  { keywords: ['clinic name'], field: 'clinicName' },
  { keywords: ['state'], field: 'state' },
  { keywords: ['city'], field: 'city' },
  { keywords: ['address'], field: 'addressLine1' },
  { keywords: ['full name', 'name'], field: 'fullName' },
];