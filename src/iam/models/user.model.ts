export interface UserSignInPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  ip?: string;
  id?: string;
}
