import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import proposalFormReducer from "./slice/proposalFormSlice";
// import formReducer from "./slice/formSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    proposalForm: proposalFormReducer,
    // form: formReducer,
  },
});
