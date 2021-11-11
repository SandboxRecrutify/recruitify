export interface User {
  id?: string;
  email: string;
  token: string;
  role?: string;
}
export interface UserResponse {
  access_token: 'string';
  expires_in: number;
  scope: 'recruitify_api';
  token_type: string;
}
export interface UserData {
  email: string;
  password: string;
}
