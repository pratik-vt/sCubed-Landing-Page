# Centralized Message Constants

This directory contains centralized constants for all user-facing messages across the application.

## Files

- **`messages.ts`** - All error messages, success messages, and info messages

## Usage

### Importing Messages

```typescript
import { ERROR_MESSAGES, SUCCESS_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
```

### Using Error Messages

Instead of hardcoding error messages:

```typescript
// ❌ DON'T DO THIS
toast.error('Network error. Please check your connection and try again.');
```

Use the centralized constants:

```typescript
// ✅ DO THIS
import { ERROR_MESSAGES } from '@/constants/messages';
toast.error(ERROR_MESSAGES.NETWORK_ERROR);
```

### Using Success Messages

```typescript
import { SUCCESS_MESSAGES } from '@/constants/messages';
import { showSuccessToast } from '@/lib/errors';

// After successful form submission
showSuccessToast(SUCCESS_MESSAGES.CONTACT_SUBMITTED);
```

### Using Dynamic Messages

For messages that need dynamic values, use the helper functions:

```typescript
import { getFieldErrorMessage, getLoadingMessage } from '@/constants/messages';

// Field error count message
const errorCount = 3;
toast.error(getFieldErrorMessage(errorCount)); // "Please correct 3 errors in the form"

// Loading message
console.log(getLoadingMessage('states')); // "Loading states..."
```

## Available Messages

### Error Messages

- `NETWORK_ERROR` - Network connectivity issues
- `UNEXPECTED_ERROR` - Generic unexpected errors
- `VALIDATION_FAILED` - Form validation failures
- `FORM_VALIDATION_ERROR` - Form-specific validation errors
- `FAILED_TO_LOAD_STATES` - State loading failures
- `RECAPTCHA_REQUIRED` - reCAPTCHA not completed
- `RECAPTCHA_FAILED` - reCAPTCHA verification failed
- And many more...

### Success Messages

- `FORM_SUBMITTED` - Generic form submission success
- `CONTACT_SUBMITTED` - Contact form submission success
- `REGISTRATION_SUCCESS` - Registration success
- `NEWSLETTER_SUBSCRIBED` - Newsletter subscription success
- And more...

### Info Messages

- `LOADING` - Generic loading state
- `PROCESSING` - Processing state
- `LOADING_STATES` - Loading states specifically
- `LOADING_CITIES` - Loading cities specifically
- And more...

## Best Practices

### 1. Always Use Constants

Never hardcode user-facing messages in components or utilities. Always use constants from `messages.ts`.

### 2. Add New Messages to Constants

When you need a new message, add it to `messages.ts` first:

```typescript
export const ERROR_MESSAGES = {
  // ... existing messages
  NEW_ERROR_TYPE: 'Your new error message here',
} as const;
```

### 3. Use Helper Functions for Dynamic Content

For messages that need dynamic values, add a helper function:

```typescript
export function getCustomMessage(param: string): string {
  return `Custom message with ${param}`;
}
```

### 4. Keep Messages User-Friendly

- Use simple, clear language
- Avoid technical jargon
- Provide actionable guidance when possible
- Keep messages concise

### 5. Avoid Duplicate Toasts

The API client (`fetchApi`) automatically shows error toasts for:
- Network errors
- General API errors (non-field errors)

It does NOT show toasts for:
- Field-level validation errors (shown inline)

**In your components:**
```typescript
try {
  const result = await fetchApi('endpoint', { method: 'POST', body: data });
  // ✅ Show success toast
  showSuccessToast(SUCCESS_MESSAGES.FORM_SUBMITTED);
} catch (error) {
  // ❌ DON'T show error toast here - fetchApi already did it
  // ✅ Just extract field errors for inline display
  if (isApiError(error)) {
    const fieldErrors = getFieldErrors(error);
    setApiFieldErrors(fieldErrors);
  }
}
```

## Examples

### Example 1: API Call with Success Toast

```typescript
import { fetchApi } from '@/lib/api-client';
import { showSuccessToast } from '@/lib/errors';
import { SUCCESS_MESSAGES } from '@/constants/messages';

async function submitForm(data: FormData) {
  try {
    await fetchApi('api/endpoint', {
      method: 'POST',
      body: data
    });

    // API error toasts are automatic
    // Just show success toast
    showSuccessToast(SUCCESS_MESSAGES.FORM_SUBMITTED);
  } catch (error) {
    // Error toast already shown by fetchApi
    // Just handle field errors if needed
    if (isApiError(error)) {
      setFieldErrors(getFieldErrors(error));
    }
  }
}
```

### Example 2: Custom Error Handling

```typescript
import { ERROR_MESSAGES } from '@/constants/messages';

try {
  // Some operation
} catch (error) {
  if (isNetworkError(error)) {
    toast.error(ERROR_MESSAGES.NETWORK_ERROR);
  } else {
    toast.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
}
```

### Example 3: Loading States

```typescript
import { INFO_MESSAGES } from '@/constants/messages';

const [loading, setLoading] = useState(false);

if (loading) {
  return <div>{INFO_MESSAGES.LOADING}</div>;
}
```

## Maintenance

### Adding New Messages

1. Open `messages.ts`
2. Add your message to the appropriate category (`ERROR_MESSAGES`, `SUCCESS_MESSAGES`, or `INFO_MESSAGES`)
3. Use descriptive, UPPERCASE_SNAKE_CASE keys
4. Ensure the message is user-friendly and clear

### Updating Messages

When updating a message, search the codebase to ensure all usages are compatible with the change:

```bash
grep -r "ERROR_MESSAGES.NETWORK_ERROR" apps/web/src
```

### Deprecating Messages

Before removing a message, search for all usages and update them first.

## Benefits

✅ **Single source of truth** - All messages in one place
✅ **Easy to update** - Change once, applies everywhere
✅ **Consistency** - Same message for same situations
✅ **Type safety** - TypeScript autocomplete and validation
✅ **Easy localization** - Future i18n support preparation
✅ **No duplicates** - Avoid showing multiple toasts for same error
✅ **Testability** - Easy to test message content
