import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial form state
const initialFormState = {
  // Basic Details
  aisheCode: "",
  nameOfInstitution: "",
  yearOfEstablishement: "",
  nameOfUniversity: "",
  isGenderSpecific: "",
  hasNaacStatus: "",
  gradingDetails: "",
  isAutonomous: "",
  autonomousDetails: "",
  isAICTEApproved: "",
  aicteDetails: "",
  isUGCApproved: "",
  ugcDetails: "",

  // Officers Details
  nameOfPrincipal: "",
  isFullTimePrincipal: "",
  collegeEmail: "",
  principalEmail: "",
  mobileNumber: "",
  telephoneNumber: "",

  // Address Details
  locationOfInstitution: "",
  addressLine1: "",
  addressLine2: "",
  cityORvillage: "",
  district: "",
  pinCode: "",
  totalArea: "",
  totalConstructedArea: "",
  website: "",

  // Confirmation
  isConfirmed: false,
};

// Async thunk for form submission
export const submitProposalForm = createAsyncThunk(
  "proposalForm/submit",
  async (formData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("/api/proposal-form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for saving draft
export const saveDraft = createAsyncThunk(
  "proposalForm/saveDraft",
  async (formData, { rejectWithValue }) => {
    try {
      // Save to localStorage
      localStorage.setItem("proposalFormDraft", JSON.stringify(formData));

      // TODO: Optionally save to server
      // const response = await fetch('/api/proposal-form/draft', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      return formData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for loading draft
export const loadDraft = createAsyncThunk(
  "proposalForm/loadDraft",
  async (_, { rejectWithValue }) => {
    try {
      const savedDraft = localStorage.getItem("proposalFormDraft");
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const proposalFormSlice = createSlice({
  name: "proposalForm",
  initialState: {
    formData: initialFormState,
    currentStep: 1,
    isLoading: false,
    isSubmitting: false,
    error: null,
    submissionResult: null,
    isDraftSaved: false,
  },
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      state.isDraftSaved = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialFormState;
      state.currentStep = 1;
      state.error = null;
      state.submissionResult = null;
      state.isDraftSaved = false;
      localStorage.removeItem("proposalFormDraft");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSubmissionResult: (state) => {
      state.submissionResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit form
      .addCase(submitProposalForm.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitProposalForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submissionResult = action.payload;
        // Clear draft after successful submission
        localStorage.removeItem("proposalFormDraft");
        state.isDraftSaved = false;
      })
      .addCase(submitProposalForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })

      // Save draft
      .addCase(saveDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveDraft.fulfilled, (state) => {
        state.isLoading = false;
        state.isDraftSaved = true;
      })
      .addCase(saveDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Load draft
      .addCase(loadDraft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.formData = { ...state.formData, ...action.payload };
        }
      })
      .addCase(loadDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateFormData,
  setCurrentStep,
  resetForm,
  clearError,
  clearSubmissionResult,
} = proposalFormSlice.actions;

export default proposalFormSlice.reducer;
