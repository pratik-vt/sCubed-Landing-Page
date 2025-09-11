# Free Trial Modal Testing Guide

## Development Server
The app is running on http://localhost:3003

## ✅ **FIXED ISSUES** - LATEST UPDATE
- **Perfect Centering**: Modal is now perfectly centered both horizontally and vertically with multiple fallbacks
- **Z-Index**: Modal appears above ALL elements with z-index 99,999,999 + global CSS overrides
- **Brand Color**: Updated to correct purple color `#7a7eed` (matching design system)
- **API Integration**: Updated to match GetStartedForm pattern for consistency
- **Compact Layout**: 27% more compact with efficient 12-column grid layout
- **Visual Improvements**: Enhanced progress bar, inline validation, professional styling

## 🔧 **RECENT TECHNICAL FIXES**
1. **Modal Positioning**: Added multiple layers of centering (CSS Grid, Flexbox, inline styles)
2. **Purple Color Update**: All purple elements now use brand color `#7a7eed`
3. **API Consistency**: States API now matches GetStartedForm implementation
4. **State/Timezone Logic**: Updated to handle proper data structure from API

## Testing Steps

### 1. Test Modal Opening
- Navigate to the homepage
- Click on "Try for Free" button in the navigation header
- The modal should open with smooth animation and be **perfectly centered**
- Modal should have:
  - Title: "Start Your 30-Day Free Trial"
  - Enhanced progress bar (6px height)
  - Two sections: Clinic Details and Primary Contact Information

### 2. Test Form Fields
- **Clinic Details Section:**
  - Clinic Name (required)
  - Tax ID (required, format: XX-XXXXXXX)
  - NPI (optional, 10 digits)
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - State dropdown (required)
  - City dropdown (required, populated after state selection)
  - Zip Code (required, format: XXXXX or XXXXX-XXXX)
  - Timezone dropdown (required, auto-populated based on state)

- **Primary Contact Section:**
  - Full Name (required)
  - Email Address (required, valid email)
  - Phone Number (required, US format)

### 3. Test Validation
- Try submitting with empty fields - should show validation errors
- Enter invalid formats:
  - Tax ID without proper format
  - Invalid email
  - Invalid phone number
  - Invalid zip code
- All errors should appear below the respective fields in red

### 4. Test State/City Interaction
- Select a state from dropdown
- City dropdown should become enabled and load cities
- Timezone should auto-populate based on state

### 5. Test Modal Behavior
- Click outside modal - should NOT close
- Press ESC key - should NOT close
- Click X button - should close and reset form
- Click Cancel button - should close and reset form

### 6. Test Hero Slider Integration
- On homepage, find the hero slider
- Click "Get Started for Free" button
- Modal should open (same as navigation button)

## API Endpoints Required
The modal expects these endpoints to be available:
- `GET /v1/states?page=1&limit=100` - Fetch states list
- `GET /v1/states/{stateId}/cities?page=1&limit=500` - Fetch cities for a state
- `POST /v1/clinics/free-trial` - Submit free trial registration

## Notes
- The modal uses `react-responsive-modal` library
- Form validation uses `react-hook-form`
- Phone number formatting uses `@react-input/mask`
- Styles are implemented with Vanilla Extract CSS-in-JS