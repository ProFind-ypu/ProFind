import { useState, type ChangeEvent } from 'react';

export interface LoginFormState {
  email: string;
  password: string;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export const useLoginFormValidation = () => {
  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginValidationErrors>({});

  const validateField = (name: keyof LoginFormState, value: string): string | undefined => {
    // Trim email for validation (but keep original in state)
    const trimmedValue = name === 'email' ? value.trim() : value;

    switch (name) {
      case 'email':
        if (!trimmedValue) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue))
          return 'Please enter a valid email address';
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof LoginFormState;

    // Update form state
    setForm((prev) => ({ ...prev, [field]: value }));

    // Validate only the changed field
    const error = validateField(field, value);
    setErrors((prev) => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        // Remove error if valid
        const { [field]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const isValid = Object.keys(errors).length === 0 && form.email.trim() !== '' && form.password !== '';

  return {
    form,
    errors,
    handleChange,
    isValid,
  };
};