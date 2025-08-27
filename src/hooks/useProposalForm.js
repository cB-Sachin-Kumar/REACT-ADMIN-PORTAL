import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../context/LoadingContext";
import {
  updateFormData,
  setCurrentStep,
  resetForm,
  clearError,
  clearSubmissionResult,
  submitProposalForm,
  saveDraft,
  loadDraft,
} from "../store/slice/proposalFormSlice";

export const useProposalForm = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoading();

  const {
    formData,
    currentStep,
    isLoading,
    isSubmitting,
    error,
    submissionResult,
    isDraftSaved,
  } = useSelector((state) => state.proposalForm);

  // Load draft on component mount
  useEffect(() => {
    dispatch(loadDraft());
  }, [dispatch]);

  // Update global loading state

  // Form validation
  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1: // Basic Details
        if (!formData.aisheCode) errors.aisheCode = "AISHE Code is required";
        if (!formData.nameOfInstitution)
          errors.nameOfInstitution = "Institution name is required";
        if (!formData.yearOfEstablishement)
          errors.yearOfEstablishement = "Establishment year is required";
        if (!formData.nameOfUniversity)
          errors.nameOfUniversity = "University name is required";
        if (!formData.isGenderSpecific)
          errors.isGenderSpecific = "Gender specification is required";
        if (!formData.hasNaacStatus)
          errors.hasNaacStatus = "NAAC status is required";
        if (formData.hasNaacStatus === "YES" && !formData.gradingDetails)
          errors.gradingDetails = "Grading details are required";

        break;

      case 2: // Officers Details
        if (!formData.nameOfPrincipal)
          errors.nameOfPrincipal = "Principal name is required";
        if (!formData.isFullTimePrincipal)
          errors.isFullTimePrincipal = "Designation is required";
        if (!formData.collegeEmail)
          errors.collegeEmail = "College email is required";
        if (!formData.principalEmail)
          errors.principalEmail = "Principal email is required";
        if (!formData.mobileNumber)
          errors.mobileNumber = "Mobile number is required";

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.collegeEmail && !emailRegex.test(formData.collegeEmail)) {
          errors.collegeEmail = "Invalid email format";
        }
        if (
          formData.principalEmail &&
          !emailRegex.test(formData.principalEmail)
        ) {
          errors.principalEmail = "Invalid email format";
        }

        // Mobile validation
        const mobileRegex = /^[0-9]{10}$/;
        if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
          errors.mobileNumber = "Mobile number must be 10 digits";
        }
        break;

      case 3: // Address Details
        if (!formData.locationOfInstitution)
          errors.locationOfInstitution = "Location is required";
        if (!formData.addressLine1)
          errors.addressLine1 = "Address Line 1 is required";
        if (!formData.addressLine2)
          errors.addressLine2 = "Address Line 2 is required";
        if (!formData.cityORvillage)
          errors.cityORvillage = "City/Village is required";
        if (!formData.district) errors.district = "District is required";
        if (!formData.pinCode) errors.pinCode = "PIN Code is required";
        if (!formData.totalArea) errors.totalArea = "Total area is required";
        if (!formData.totalConstructedArea)
          errors.totalConstructedArea = "Constructed area is required";
        if (!formData.website) errors.website = "Website is required";

        // PIN code validation
        const pinRegex = /^[0-9]{6}$/;
        if (formData.pinCode && !pinRegex.test(formData.pinCode)) {
          errors.pinCode = "PIN Code must be 6 digits";
        }

        // URL validation
        const urlRegex = /^https?:\/\/.+/;
        if (formData.website && !urlRegex.test(formData.website)) {
          errors.website = "Website must be a valid URL";
        }
        break;

      case 4: // Confirmation
        if (!formData.isConfirmed)
          errors.isConfirmed = "Please confirm the information";
        break;

      default:
        break;
    }

    return errors;
  };

  // Handle input change
  const handleInputChange = (name, value) => {
    dispatch(updateFormData({ [name]: value }));
  };

  // Handle step navigation
  const handleNextStep = () => {
    const errors = validateStep(currentStep);

    if (Object.keys(errors).length === 0) {
      // Save draft before moving to next step
      dispatch(saveDraft(formData));
      dispatch(setCurrentStep(currentStep + 1));
      window.scrollTo(0, 0);
      return true;
    } else {
      // Handle validation errors (you can show them in UI)
      console.log("Validation errors:", errors);
      return false;
    }
  };

  const handlePreviousStep = () => {
    dispatch(setCurrentStep(currentStep - 1));
    window.scrollTo(0, 0);
  };

  const handleStepChange = (step) => {
    dispatch(setCurrentStep(step));
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const errors = validateStep(4);

    if (Object.keys(errors).length === 0) {
      try {
        const result = await dispatch(submitProposalForm(formData)).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Please fix validation errors");
    }
  };

  // Save draft manually
  const handleSaveDraft = () => {
    dispatch(saveDraft(formData));
  };

  // Reset form
  const handleResetForm = () => {
    dispatch(resetForm());
  };

  // Clear error
  const handleClearError = () => {
    dispatch(clearError());
  };

  // Clear submission result
  const handleClearSubmissionResult = () => {
    dispatch(clearSubmissionResult());
  };

  return {
    // State
    formData,
    currentStep,
    isLoading,
    isSubmitting,
    error,
    submissionResult,
    isDraftSaved,

    // Actions
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
    handleStepChange,
    handleSubmit,
    handleSaveDraft,
    handleResetForm,
    handleClearError,
    handleClearSubmissionResult,
    validateStep,
  };
};
