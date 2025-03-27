import { API } from "@/services/api";
import { AuthResponse } from "@/types/auth";

// ✅ API login
export const loginAPI = async (credentials: { email: string; password: string }) => {
  return await API.post<AuthResponse>("/auth/login", credentials);
};

// ✅ API register
export const registerAPI = async (data: { name: string; email: string; password: string }) => {
  return await API.post<AuthResponse>("/auth/register", data);
};

// ✅ API refresh token
export const refreshTokenAPI = async () => {
  return await API.get<{ token: string }>("/auth/refresh-token");
};
