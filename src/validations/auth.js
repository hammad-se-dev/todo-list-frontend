import * as yup from 'yup';

// Register validation schema
export const registerSchema = yup.object({
  fullname: yup
    .string()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name cannot exceed 100 characters')
    .required('Full name is required')
    .trim(),
  
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required')
    .lowercase()
    .trim(),
  
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  
  profileImageUrl: yup
    .string()
    .url('Profile image URL must be a valid URL')
    .nullable()
    .optional()
});

// Login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required')
    .lowercase()
    .trim(),
  
  password: yup
    .string()
    .required('Password is required')
});

// Forgot password validation schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required')
    .lowercase()
    .trim()
});

// Reset password validation schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

// Change password validation schema
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  
  newPassword: yup
    .string()
    .min(6, 'New password must be at least 6 characters long')
    .required('New password is required'),
  
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password')
});
