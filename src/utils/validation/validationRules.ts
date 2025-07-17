
export interface ValidationRule {
  name: string;
  test: (value: any) => boolean;
  message: string;
  critical?: boolean;
}

export const stringValidationRules: ValidationRule[] = [
  {
    name: 'no_script_injection',
    test: (value: string) => !/<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(value),
    message: 'Script injection detected',
    critical: true
  },
  {
    name: 'no_sql_injection',
    test: (value: string) => !/(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDROP\b|\bDELETE\b)/gi.test(value),
    message: 'SQL injection pattern detected',
    critical: true
  },
  {
    name: 'no_path_traversal',
    test: (value: string) => !/(\.\.|\/\.\.|\\\.\.)/g.test(value),
    message: 'Path traversal detected',
    critical: true
  }
];

export const emailValidationRules: ValidationRule[] = [
  {
    name: 'valid_format',
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email format'
  },
  {
    name: 'no_suspicious_domains',
    test: (value: string) => {
      const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
      const domain = value.split('@')[1]?.toLowerCase();
      return !suspiciousDomains.includes(domain);
    },
    message: 'Suspicious email domain detected'
  }
];

export const passwordValidationRules: ValidationRule[] = [
  {
    name: 'min_length',
    test: (value: string) => value.length >= 8,
    message: 'Password must be at least 8 characters long'
  },
  {
    name: 'complexity',
    test: (value: string) => {
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      return [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length >= 3;
    },
    message: 'Password must contain at least 3 of: uppercase, lowercase, numbers, special characters'
  }
];
