import apiClient from "../../functions/apiConfig";
import { API_ENDPOINTS } from "../../apiEndpoint";

// export const adminApi = {
//   getReport: async (payload) => {
//     const { data } = await apiClient.post(
//       API_ENDPOINTS.admin.getReport,
//       payload
//     );
//     return data;
//   },
// };

export const adminApi = {
  getReport: async (payload) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.admin.getReport,
      payload
    );
    return data;
  },
  getCandidateDetails: async (registrationNo) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.admin.getCandidateDetails,
      registrationNo
    );
    return data;
  },

  handleVerifyCandidate: async (payload) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.admin.handleVerifyCandidate,
      payload
    );
    return data;
  },

  handleRejectCandidate: async (payload) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.admin.handleRejectCandidate,
      payload
    );
    return data;
  },
};
