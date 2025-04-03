import { API } from "@/services/api";
import { AuthResponse } from "@/types/auth";

// ✅ API login
export const loginAPI = async (credentials: {
  username: string;
  password: string;
}) => {
  return await API.post<AuthResponse>("/auth/login", credentials);
};

// ✅ API register
export const registerAPI = async (data: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dob: Date;
}) => {
  return await API.post<AuthResponse>("/auth/register", data);
};

// ✅ API refresh token
export const refreshTokenAPI = async () => {
  return await API.get<{ token: string }>("/auth/refresh-token");
};

// ✅ API update user profile (PUT)
export const updateUserProfileAPI = async (data: {
  name: string;
  email: string;
}) => {
  return await API.put<{ message: string }>("/auth/update-profile", data);
};
