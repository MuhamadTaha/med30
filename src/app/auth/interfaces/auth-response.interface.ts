export interface AuthResponse {
  kind: string,
  idToken: string,
  refreshToken: string,
  email: string,
  expiresIn: string,
  localId: string,
  registered?: string,
}
