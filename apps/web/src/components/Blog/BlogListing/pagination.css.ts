import { style } from '@vanilla-extract/css';

export const paginationContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '2rem',
});

export const paginationButton = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#374151',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  
  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

export const paginationButtonDisabled = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#9ca3af',
  backgroundColor: '#f3f4f6',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  cursor: 'not-allowed',
});

export const pageNumbersContainer = style({
  display: 'flex',
  gap: '0.25rem',
});

export const pageNumber = style({
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  borderRadius: '0.375rem',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  color: '#374151',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  
  ':hover': {
    backgroundColor: '#f9fafb',
  },
});

export const pageNumberActive = style({
  backgroundColor: '#2563eb',
  color: 'white',
  borderColor: '#2563eb',
  
  ':hover': {
    backgroundColor: '#1d4ed8',
  },
});

export const ellipsis = style({
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#6b7280',
}); 