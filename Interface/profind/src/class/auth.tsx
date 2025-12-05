export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: string;
  isOnline?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
}
