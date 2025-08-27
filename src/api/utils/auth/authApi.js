// api/auth/authApi.js
import apiClient from "../../functions/apiConfig";
import API_ENDPOINTS from "../../apiEndpoint";
import signup from "../../../store/slice/authSlice";

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.auth.login,
      credentials
    );
    return data;
  },
  userLogin: async (payload) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.auth.userlogin,
      payload
    );
    return data;
  },
  register: async (registerData) => {
    const { data } = apiClient.post(API_ENDPOINTS.auth.register, registerData);
    return data;
  },
  forgetPassword: async (userData) => {
    const { data } = apiClient.post(
      API_ENDPOINTS.auth.forgetPassword,
      userData
    );
    return data;
  },
  signup: async (signupData) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.auth.signup,
      signupData
    );
    return data;
  },
  // getDistrict: async () => {
  //   const { data } = apiClient.post(API_ENDPOINTS.auth.getDistrict);
  //   return data;
  // },
};
