export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/** Shape returned by /api/auth/login, /register, and /me */
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}
