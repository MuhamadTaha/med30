export interface AuthResponse {
  userId: string,
  roles?: string,
  userType?: number,
  userTypeEntityId?: number,
  userName?: string,
  displayName?: string,
  token: string,
  refreshToken: string,
  expDateTime?: Date
}
