export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    userlogin: "/auth/user-login",
    register: "stage-two/auth/register",
    forgetPassword: "/auth/forgot-password",
    signup: "stage-two/register-application",
    getDistrict: "stage-two/get-district",
  },
  users: {
    getAll: "/users",
    getOne: "/users/:id",
    create: "/users",
    update: "/users/:id",
    delete: "/users/:id",
  },
  admin: {
    getReport: "stage-two/get-seceratary-data",
    getCandidateDetails: "stage-two/get-user-data",
    handleVerifyCandidate: "stage-two/verify-candidate",
    handleRejectCandidate: "stage-two/reject-candidate",
  },
};

export default API_ENDPOINTS;
