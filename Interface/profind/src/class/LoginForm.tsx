export interface LoginForm {
  email: string;
  password: string;
}
export interface LoginFormState {
  email: string;
  password: string;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}
