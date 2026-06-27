import 'jsonwebtoken';
declare module 'jsonwebtoken' {
  interface JwtPayload {
    email?: string;
    role?: string;
  }
}
