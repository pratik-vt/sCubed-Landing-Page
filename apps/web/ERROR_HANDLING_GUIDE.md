# Error Handling Guide

This document explains how errors are handled in the application and what the user will see in different scenarios.

## Error Classification

The system automatically classifies errors into two categories:

### 1. **Field Validation Errors** (Shown Inline Only)
These are errors related to specific form fields. They are displayed **inline** next to the field, **NOT as toasts**.

**Identification:**
- Error has a `field` property in the response, OR
- Error message contains field-related keywords:
  - "zip code", "zipcode"
  - "email"
  - "phone"
  - "tax id"
  - "npi"
  - "city"
  - "state"
  - "address"

**Example:**
```json
{
  "errors": [
    {
      "message": "Invalid Zip Code. Please enter a valid zip code for the selected city."
    }
  ],
  "status_code": 422
}
```
**User sees:**
- ❌ NO toast
- ✅ Error message appears inline below the zip code field

---

### 2. **General Business Logic Errors** (Shown as Toast)
These are errors not related to specific fields - usually business logic, authorization, or system errors.

**Identification:**
- Error does NOT have a `field` property, AND
- Error message does NOT contain field-related keywords

**Example:**
```json
{
  "errors": [
    {
      "message": "A clinic with this name is already pending approval. Please use a different name or contact support."
    }
  ],
  "status_code": 422
}
```
**User sees:**
- ✅ ONE toast with the error message
- ❌ NO inline error

---

## Error Handling by Status Code

### **200-299 (Success)**
✅ Return data to component
✅ Component shows success toast (if needed)

### **422 (Unprocessable Entity)**
The system intelligently determines if it's a field error or general error:

#### Field Validation Error (422)
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    }
  ],
  "status_code": 422
}
```
**Result:**
- ❌ NO toast
- ✅ Error shown inline next to email field

#### General Business Logic Error (422)
```json
{
  "errors": [
    {
      "message": "Clinic name already exists"
    }
  ],
  "status_code": 422
}
```
**Result:**
- ✅ ONE toast: "Clinic name already exists"
- ❌ NO inline error

### **400, 401, 403, 404, 500, etc.**
✅ ONE toast with error message from API
❌ NO inline error

### **Network Error (No Response)**
✅ ONE toast: "Network error. Please check your connection and try again."
❌ NO inline error

---

## Decision Tree

```
API Error Occurs
    ↓
Is it a network error?
    ├─ YES → Show toast: "Network error..."
    │
    └─ NO → Parse error response
            ↓
        Does error have `field` property?
            ├─ YES → Field validation error
            │         ❌ NO toast
            │         ✅ Show inline
            │
            └─ NO → Check message content
                    ↓
                Does message contain field keywords?
                    ├─ YES → Inferrable field error
                    │         ❌ NO toast
                    │         ✅ Show inline (inferred field)
                    │
                    └─ NO → General error
                              ✅ Show toast
                              ❌ NO inline
```

---

## Test Scenarios

### ✅ Scenario 1: Field Error with `field` Property
**API Response:**
```json
{
  "errors": [
    {
      "field": "tax_id",
      "message": "Tax ID must be 9 digits"
    }
  ],
  "status_code": 422
}
```
**Expected Behavior:**
- ❌ NO toast
- ✅ Error appears below tax_id field

---

### ✅ Scenario 2: Field Error WITHOUT `field` (Inferred)
**API Response:**
```json
{
  "errors": [
    {
      "message": "Invalid Zip Code. Please enter a valid zip code."
    }
  ],
  "status_code": 422
}
```
**Expected Behavior:**
- ❌ NO toast
- ✅ Error appears below zip_code field (inferred from message)

---

### ✅ Scenario 3: General Business Logic Error (422)
**API Response:**
```json
{
  "errors": [
    {
      "message": "A clinic with this name is already pending approval."
    }
  ],
  "status_code": 422
}
```
**Expected Behavior:**
- ✅ ONE toast with the message
- ❌ NO inline error

---

### ✅ Scenario 4: Server Error (500)
**API Response:**
```json
{
  "errors": [
    {
      "message": "Internal Server Error"
    }
  ],
  "status_code": 500
}
```
**Expected Behavior:**
- ✅ ONE toast: "Internal Server Error"
- ❌ NO inline error

---

### ✅ Scenario 5: Network Error
**No Response** (fetch failed, timeout, etc.)

**Expected Behavior:**
- ✅ ONE toast: "Network error. Please check your connection and try again."
- ❌ NO inline error

---

### ✅ Scenario 6: Multiple Errors (Mixed)
**API Response:**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "message": "Invalid Zip Code"
    },
    {
      "message": "Clinic already exists"
    }
  ],
  "status_code": 422
}
```
**Expected Behavior:**
- ❌ NO toast (has field errors)
- ✅ "Email is required" shown inline next to email field
- ✅ "Invalid Zip Code" shown inline next to zip_code field (inferred)
- ❌ "Clinic already exists" - not shown (can't infer field)

**Note:** In this case, the general error ("Clinic already exists") won't be shown because the response has field errors. To ensure all errors are visible, the backend should either:
1. Return field errors separately from general errors, OR
2. Include general errors with status code other than 422

---

## Best Practices for Backend

To ensure optimal error display:

### ✅ DO: Include `field` Property for Field Errors
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    }
  ],
  "status_code": 422
}
```

### ✅ DO: Use Field Keywords in Messages (if no `field` property)
```json
{
  "errors": [
    {
      "message": "Invalid email address format"
    }
  ],
  "status_code": 422
}
```
System will infer `field: "email"` from message.

### ✅ DO: Use Clear Messages for General Errors
```json
{
  "errors": [
    {
      "message": "Clinic name already exists. Please use a different name."
    }
  ],
  "status_code": 422
}
```

### ❌ DON'T: Mix Field and General Errors in Same Response
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "message": "Clinic already exists"  // Won't show as toast!
    }
  ],
  "status_code": 422
}
```
The general error won't show because field errors are present.

**Better approach:** Return two separate responses or use different status codes.

---

## Troubleshooting

### Issue: Field error showing as toast
**Cause:** Message doesn't contain recognizable field keywords.

**Solution:** Either:
1. Add `field` property to backend response, OR
2. Update `inferFieldFromMessage()` in `lib/errors.ts` to include your field keyword

### Issue: General error not showing
**Cause:** Message contains field keywords, so system treats it as field error.

**Solution:** Either:
1. Rephrase message to avoid field keywords, OR
2. Use a different status code (not 422)

### Issue: Multiple toasts appearing
**Cause:** Component is manually showing toasts after API error.

**Solution:** Remove manual toast calls - `fetchApi` handles it automatically:
```typescript
// ❌ DON'T DO THIS
try {
  await fetchApi(...);
} catch (error) {
  showErrorToast(error); // REMOVE THIS - duplicate toast!
}

// ✅ DO THIS
try {
  await fetchApi(...);
} catch (error) {
  // Only extract field errors for inline display
  if (isApiError(error)) {
    setFieldErrors(getFieldErrors(error));
  }
}
```

---

## Summary

| Error Type | Has `field`? | Contains Field Keywords? | Shows Toast? | Shows Inline? |
|------------|--------------|--------------------------|--------------|---------------|
| Field validation (with field) | ✅ Yes | N/A | ❌ No | ✅ Yes |
| Field validation (inferred) | ❌ No | ✅ Yes | ❌ No | ✅ Yes |
| General business logic | ❌ No | ❌ No | ✅ Yes | ❌ No |
| Server error (500, etc.) | N/A | N/A | ✅ Yes | ❌ No |
| Network error | N/A | N/A | ✅ Yes | ❌ No |

**Golden Rule:** Only **ONE** toast per error, and field errors are **ALWAYS** shown inline, never as toasts.
