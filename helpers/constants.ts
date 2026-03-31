/**
 * Application Constants
 * Contains all magic strings, default values, and configuration constants
 */

// API Endpoints and URLs
export const API_ENDPOINTS = {
  MEETINGS: '/meetings',
  COMPANIES: '/companies',
  FEATURED_COMPANIES: '/companies/featured',
  SEARCH_EMPLOYEES: '/meetings/search-employees',
  AUTH_SESSION: '/api/auth/session',
  SETTINGS: '/settings',
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Timeout Values (in milliseconds)
export const TIMEOUTS = {
  DEFAULT_API_TIMEOUT: 10000,
  DEFAULT_REQUEST_TIMEOUT: 30000,
  ELEMENT_WAIT_TIMEOUT: 5000,
} as const;

// Cookie Names - Generic authentication cookie patterns
export const COOKIE_NAMES = {
  CSRF_TOKEN: '__Host-auth-csrf-token',
  SESSION_TOKEN: '__Secure-auth-session-token',
  CALLBACK_URL: '__Secure-auth-callback-url',
} as const;

// Headers
export const DEFAULT_HEADERS = {
  CONTENT_TYPE: 'application/json',
  AUTHORIZATION: 'Authorization',
} as const;

// Meeting Statuses
export const MEETING_STATUS = {
  PREPARED: 'PREPARED',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
  CANCELED: 'CANCELED',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_REQUEST: 'Invalid request parameters',
  AUTHENTICATION_FAILED: 'Authentication failed',
  API_ERROR: 'API request failed',
  NETWORK_ERROR: 'Network request failed',
  INVALID_DATA: 'Invalid data provided',
  REQUIRED_FIELD_MISSING: 'Required field is missing',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 255,
  MIN_ID: 1,
} as const;

// Auth Configuration
export const AUTH_CONFIG = {
  STORAGE_PATH: '.auth/user.json',
  COOKIE_HEADER_FORMAT: (token: string) => `Bearer ${token}`,
} as const;
