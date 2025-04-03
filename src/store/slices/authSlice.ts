import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { loginAPI, registerAPI, refreshTokenAPI } from "@/services/authService";
import { AuthResponse } from "@/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated:
    typeof window !== "undefined" && Boolean(sessionStorage.getItem("token")),
  user: null,
};

// ✅ Gọi API đăng nhập
export const loginUser = createAsyncThunk<
  { token: string; authenticated: boolean },
  { username: string; password: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginAPI(credentials);
    const { token, authenticated } = response.result;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token); // Chỉ lưu token trên client-side
    }

    return { token, authenticated };
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error?.message || "Login failed");
  }
});

// ✅ Gọi API đăng ký
export const registerUser = createAsyncThunk<
  { token: string; authenticated: boolean },
  {
    username: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    dob: Date;
  }
>("user", async (data, { rejectWithValue }) => {
  try {
    const response = await registerAPI(data);
    const { token, authenticated } = response.result;

    sessionStorage.setItem("token", token);

    return { token, authenticated };
  } catch (error: any) {
    return rejectWithValue(error?.message || "Register failed");
  }
});

// ✅ Gọi API làm mới token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshTokenAPI();
      sessionStorage.setItem("token", response.token);
      return response.token;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to refresh token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.authenticated; // Cập nhật từ response
        state.user = { token: action.payload.token }; // Ví dụ bạn có thể tùy chỉnh
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.authenticated;
        state.user = { token: action.payload.token };
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
