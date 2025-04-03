import { User } from "./user";

export interface AuthResponse {
  code: number;
  message: string;
  result: {
    token: string;
    authenticated: boolean;
  };
}
