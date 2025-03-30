import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { loginAPI, registerAPI, refreshTokenAPI } from "@/services/authService";
import { AuthResponse } from "@/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// ✅ Gọi API đăng nhập
export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Login failed");
    }
  }
);

// ✅ Gọi API đăng ký
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Register failed");
    }
  }
);

// ✅ Gọi API làm mới token
export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await refreshTokenAPI();
    localStorage.setItem("token", response.token);
    return response.token;
  } catch (error: any) {
    return rejectWithValue(error?.message || "Failed to refresh token");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (_, action) => {
        console.error("Login failed:", action.payload);
      })
      .addCase(registerUser.rejected, (_, action) => {
        console.error("Register failed:", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
