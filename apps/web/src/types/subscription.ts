/**
 * Subscription Flow Types
 * Type definitions for the S Cubed subscription multi-step form
 */

// ============================================================================
// FORM DATA TYPES
// ============================================================================

/**
 * Clinic Information (Step 1)
 */
export interface ClinicInfo {
  clinic_name: string;
  tax_id: string; // 9 digits, required
  npi?: string; // 10 digits, optional
}

/**
 * Location Information (Step 1)
 */
export interface LocationInfo {
  street_address_line_1: string;
  street_address_line_2?: string; // Optional
  city_id: number; // From cities dropdown
  state_id: number; // From states dropdown
  zip_code: string; // US zip code
  timezone_id: number; // Extracted from selected state
}

/**
 * Admin User Information (Step 1)
 */
export interface AdminInfo {
  email: string;
  first_name: string;
  last_name: string;
  phone: string; // US phone number
}

/**
 * Subscription Information (Step 1 & 3)
 */
export interface SubscriptionInfo {
  subscription_plan_id: number; // Plan ID
  staff_count: number; // Minimum 1
}

/**
 * Payment Information (Step 3 - Paid Plans Only)
 */
export interface PaymentInfo {
  billing_cycle: 'monthly' | 'yearly';
  payment_method_id?: string; // Stripe payment method ID (optional until checkout)
  addons?: number[]; // Optional: Array of addon feature IDs
}

/**
 * OTP Verification Data (Step 2)
 */
export interface OTPVerification {
  email: string;
  otp_code: string;
}

// ============================================================================
// COMBINED FORM DATA
// ============================================================================

/**
 * Complete Step 1 Form Data (Clinic + Location + Admin + Subscription)
 */
export interface Step1FormData
  extends ClinicInfo,
    Omit<LocationInfo, 'city_id' | 'state_id' | 'timezone_id'>,
    AdminInfo,
    SubscriptionInfo {
  // Dropdown values as objects for react-hook-form
  city: City | null;
  state: State | null;
  timezone_id?: number; // Automatically extracted from state
}

/**
 * Complete Subscription Payload - Free Plan
 */
export interface FreeSubscriptionPayload
  extends ClinicInfo,
    LocationInfo,
    AdminInfo,
    SubscriptionInfo {}

/**
 * Complete Subscription Payload - Paid Plan
 */
export interface PaidSubscriptionPayload
  extends ClinicInfo,
    LocationInfo,
    AdminInfo,
    SubscriptionInfo,
    PaymentInfo {}

// ============================================================================
// DROPDOWN OPTIONS
// ============================================================================

/**
 * Generic dropdown option
 */
export interface DropdownOption {
  id: number;
  name: string;
  value?: string;
}

/**
 * City dropdown option
 */
export interface City extends DropdownOption {
  state_id: number;
}

/**
 * State dropdown option with embedded timezone data
 */
export interface State {
  id: number;
  name: string;
  code: string;
  timezones: Array<{
    timezone_id: number;
    timezone: {
      timezone: string;
    };
  }>;
}

// ============================================================================
// PLAN TYPES
// ============================================================================

/**
 * Subscription Plan Details
 */
export interface SubscriptionPlan {
  id: number;
  name: string;
  type: 'free' | 'paid';
  price?: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  staff_limit?: number;
}

/**
 * Addon Feature
 */
export interface AddonFeature {
  id: number;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * API Success Response
 */
export interface ApiSuccessResponse {
  success: boolean;
  message: string;
  data?: {
    subscription_id?: string;
    payment_session_url?: string;
  };
}

/**
 * API Error Response (422)
 */
export interface ApiErrorResponse {
  errors: FieldError[];
  status_code: number;
  message?: string;
}

/**
 * Field-level error
 */
export interface FieldError {
  field: string;
  message: string;
}

// ============================================================================
// FORM STATE TYPES
// ============================================================================

/**
 * Multi-step form state
 */
export interface SubscriptionFormState {
  currentStep: 0 | 1 | 2 | 3 | 4;
  step1Data: Partial<Step1FormData>;
  clinic_onboarding_request_id?: number; // From email verification (Step 0)
  otpVerified: boolean;
  selectedPlan: SubscriptionPlan | null;
  selectedAddons: number[];
  billingCycle: 'monthly' | 'yearly';
  isSubmitting: boolean;
  submitError: string | null;
  paymentUrl: string | null; // From cart submission (paid plans)
  paymentRequired: boolean;
}

// ============================================================================
// STRIPE TYPES
// ============================================================================

/**
 * Stripe Payment Session Request
 */
export interface StripeSessionRequest {
  subscription_plan_id: number;
  billing_cycle: 'monthly' | 'yearly';
  staff_count: number;
  addons: number[];
  customer_email: string;
  success_url: string;
  cancel_url: string;
}

/**
 * Stripe Payment Session Response
 */
export interface StripeSessionResponse {
  session_id: string;
  session_url: string;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * API Registration Response Data
 */
export interface RegistrationResponseData {
  clinic_onboarding_request_id: number;
  email: string;
  clinic_name: string;
  next_step: string;
}

/**
 * Props for Step 0 (Email Input) Component
 */
export interface Step0Props {
  onNext: (clinic_onboarding_request_id: number, email: string) => void;
  initialEmail?: string;
}

/**
 * Props for Step 1 Component (Clinic Details - Now Step 2 in new flow)
 */
export interface Step1Props {
  onNext: (data: Step1FormData, apiResponse?: RegistrationResponseData) => void;
  onBack?: () => void;
  initialData?: Partial<Step1FormData>;
  selectedPlan?: SubscriptionPlan | null;
  billingCycle?: 'monthly' | 'yearly';
  clinic_onboarding_request_id?: number;
}

/**
 * OTP Verification Response Data
 */
export interface OTPVerificationResponse {
  clinic: {
    id: number;
    clinic_name: string;
    onboarding_status: string;
  };
  subscription: {
    id: number;
    status: string;
    billing_cycle?: string;
  };
  payment_required: boolean;
  payment_url?: string;
  next_step: string;
}

/**
 * Props for Step 2 (OTP) Component
 */
export interface Step2Props {
  email: string;
  clinic_onboarding_request_id: number;
  onVerified: (responseData: OTPVerificationResponse) => void;
  onBack: () => void;
}

/**
 * Props for Step 3 (Free Plan Success) Component
 */
export interface Step3FreeProps {
  formData: FreeSubscriptionPayload;
}

/**
 * Props for Step 3 (Paid Plan Cart) Component (Now Step 4 in new flow)
 */
export interface Step3PaidProps {
  formData: Partial<Step1FormData>;
  onNext: (data: {
    staff_count: number;
    addons: number[];
    billing_cycle: 'monthly' | 'yearly';
    payment_url?: string;
  }) => void;
  onBack: () => void;
  clinic_onboarding_request_id?: number;
}

/**
 * Props for Step 4 (Payment Processing) Component
 */
export interface Step4Props {
  formData: PaidSubscriptionPayload;
  paymentUrl?: string | null; // Pre-generated payment URL from OTP verification
  onBack?: () => void;
}

/**
 * Props for Success Page Component
 */
export interface SuccessPageProps {
  isPaidPlan: boolean;
  clinicName: string;
  email: string;
}
