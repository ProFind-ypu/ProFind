import { useState, type ChangeEvent } from 'react';

export interface SignupFormState {
  firstName: string;
  lastName: string;
  universityId: string;
  email:string;
  password: string;
  confirmPassword: string;
}

export interface SignUpValidationErrors {
  firstName?: string;
  lastName?: string;
  universityId?: string;
  password?: string;
  confirmPassword?: string;
  email?:string;
}

export const useSignupFormValidation = () => {
  const [form, setForm] = useState<SignupFormState>({
    firstName: '',
    lastName: '',
    universityId: '',
    email:'',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<SignUpValidationErrors>({});

  const validateField = (name: keyof SignupFormState, value: string): string | undefined => {
        const trimmedValue = value.trim();
    switch (name) {
      case 'firstName':
        if (!trimmedValue) return 'First name is required';
        if (trimmedValue.length < 2) return 'First name must be at least 2 characters long';
        if (!/^[a-zA-Z]+$/.test(trimmedValue)) return 'First name can only contain letters';
        return undefined;

      case 'lastName':
        if (!trimmedValue) return 'Last name is required';
        if (trimmedValue.length < 2) return 'Last name must be at least 2 characters long';
        if (!/^[a-zA-Z]+$/.test(trimmedValue)) return 'Last name can only contain letters';
        return undefined;

      case 'universityId':
        if (!trimmedValue) return 'University ID is required';
        if (!/^\d+$/.test(trimmedValue)) return 'University ID must contain only numbers';
        if (trimmedValue.length < 6) return 'University ID must be at least 6 digits long';
        return undefined;
      case 'email':
        if (!trimmedValue) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue))
          return 'Please enter a valid email address';
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return undefined;

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== form.password) return 'Passwords do not match';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof SignupFormState;

    setForm((prev) => ({ ...prev, [field]: value }));

    const error = validateField(field, value);
    setErrors((prev) => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.firstName.trim() !== '' &&
    form.lastName.trim() !== '' &&
    form.universityId.trim() !== '' &&
    form.password !== '' &&
    form.confirmPassword !== '';

  return {
    form,
    errors,
    handleChange,
    isValid,
  };
};