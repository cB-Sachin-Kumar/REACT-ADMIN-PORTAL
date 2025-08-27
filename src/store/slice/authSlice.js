import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/utils/auth/authApi";
//createAsyncThunk → A helper function to handle asynchronous logic (like API calls) in Redux, automatically generating pending/fulfilled/rejected action types.
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res =
        credentials?.userType === "user"
          ? await authApi.userLogin({
              mobileNo: credentials?.mobileNumber,
              adharNo: credentials?.aadharNumber,
              ip: credentials?.ip,
            })
          : await authApi.login(credentials);

      const token = res?.token ?? res?.data?.token;
      const user = res?.user ?? res?.data?.user ?? res?.data;
      const role = user?.role ?? res?.data?.data?.role;

      if (token) localStorage.setItem("authToken", token);
      if (user) localStorage.setItem("userData", JSON.stringify(user));
      if (role) localStorage.setItem("role", role);

      return { token, user, role };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = authApi.register(registerData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const result = await authApi.signup(signupData);
      return result; // { status, data: {...} }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const forgetpassword = createAsyncThunk(
  "auth/forgetpassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = authApi.forgetPassword(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  token: localStorage.getItem("authToken") || null,
  user: JSON.parse(localStorage.getItem("userData") || "null"),
  role: localStorage.getItem("role") || null,
  isLoading: false,
  error: null,
  isAuthenticated: !!(
    localStorage.getItem("authToken") && localStorage.getItem("role")
  ),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("role");
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token || null;
        state.user = action.payload.user || null;
        state.role = action.payload.role || action.payload.user?.role || null;
        state.isAuthenticated = !!(state.token && state.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = !!(
          state.token &&
          (state.role || state.user?.role)
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || action.error?.message || "Request failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
