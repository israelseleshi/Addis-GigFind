export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormErrors {
  [key: string]: string[];
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Name validation
export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.push('Name can only contain letters and spaces');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Phone validation (Ethiopian format)
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
  } else if (!/^\+251[79]\d{8}$/.test(phone)) {
    errors.push('Please enter a valid Ethiopian phone number (+251XXXXXXXXX)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Confirm password validation
export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('Please confirm your password');
  } else if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Required field validation
export function validateRequired(value: string, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (!value || value.trim() === '') {
    errors.push(`${fieldName} is required`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate entire form
export function validateForm(formData: Record<string, string>, rules: Record<string, (value: string) => ValidationResult>): FormErrors {
  const formErrors: FormErrors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field] || '';
    const result = rules[field](value);
    
    if (!result.isValid) {
      formErrors[field] = result.errors;
    }
  });
  
  return formErrors;
}

// Check if form has any errors
export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).some(field => errors[field].length > 0);
}
