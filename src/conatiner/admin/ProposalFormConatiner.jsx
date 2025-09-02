import React, { useState, useRef, useEffect } from "react";
import { useDistricts } from "../../hooks/useDistrict";
import { useProposalForm } from "../../hooks/useProposalForm";
import {
  Search,
  School,
  Info,
  User,
  MapPin,
  Award,
  ArrowRight,
  Save,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

export default function ProposalFormContainer() {
  const { districts } = useDistricts();
  const {
    formData,
    currentStep,
    isLoading,
    isSubmitting,
    error,
    submissionResult,
    isDraftSaved,
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    handleSaveDraft,
    validateStep,
  } = useProposalForm();

  const [validationErrors, setValidationErrors] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // Handle input change with validation
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    handleInputChange(name, fieldValue);

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle step navigation with validation
  const handleStepNavigation = () => {
    const errors = validateStep(currentStep);

    if (Object.keys(errors).length === 0) {
      const success = handleNextStep();
      if (success && isDraftSaved) {
        Swal.fire({
          icon: "success",
          title: "Progress Saved!",
          text: "Your form data has been saved automatically.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } else {
      setValidationErrors(errors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields correctly.",
      });
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    const errors = validateStep(4);

    if (Object.keys(errors).length === 0) {
      try {
        const result = await handleSubmit();

        Swal.fire({
          icon: "success",
          title: "Form Submitted Successfully!",
          html: `
            <p>Your registration has been submitted successfully.</p>
            <p><strong>Registration ID:</strong> ${
              result.registrationId || "REG-" + Date.now()
            }</p>
            <p>You will receive a confirmation email shortly.</p>
          `,
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      }
    } else {
      setValidationErrors(errors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please confirm that all information is correct.",
      });
    }
  };

  // Handle save draft
  const handleSaveDraftClick = () => {
    handleSaveDraft();
    Swal.fire({
      icon: "success",
      title: "Draft Saved!",
      text: "Your progress has been saved. You can continue later.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-6">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Proposal Form</h2>
            <div className="flex gap-2">
              <button
                onClick={handleSaveDraftClick}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </button>
              {isDraftSaved && (
                <span className="text-green-600 text-sm flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Draft Saved
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } font-bold text-lg`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-24 h-1 ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <div className="w-40 text-center">Basic Details</div>
            <div className="w-40 text-center">Officers Details</div>
            <div className="w-40 text-center">Address Details</div>
            <div className="w-40 text-center">Confirmation</div>
          </div>
        </div>

        {/* Search Form */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-yellow-500">
          <div className="flex items-center mb-4">
            <Search className="text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Search University/College With AISHECODE
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <label
                htmlFor="aisheCode1"
                className="block text-sm font-medium text-red-600 mb-1"
              >
                University/College AISHECODE
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="aisheCode1"
                id="aisheCode1"
                placeholder="Enter School AISHECODE"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center mt-6">
              <Search className="mr-2 h-4 w-4" />
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center justify-between border-t pt-4 text-sm">
            <div className="text-blue-800 font-semibold mb-2 md:mb-0">
              Please View Sample Form Before Filling :
              <span id="collegeaishecode" className="text-red-600 ml-1"></span>
            </div>
            <div className="flex space-x-2">
              <a
                href="/file/finalconstructionchange.pdf"
                target="_blank"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Sample
              </a>
            </div>
          </div>
        </div> */}

        {/* Main Form Sections */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 px-6 flex items-center">
              <School className="text-white mr-3" />
              <h3 className="text-lg font-semibold text-white">
                Basic Details/Information
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University/College AISHECODE{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      validationErrors.aisheCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="aisheCode"
                    value={formData.aisheCode}
                    ref={inputRef}
                    onChange={handleFieldChange}
                    placeholder="Enter AISHE Code"
                  />
                  {validationErrors.aisheCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.aisheCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      validationErrors.nameOfInstitution
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="nameOfInstitution"
                    value={formData.nameOfInstitution}
                    onChange={handleFieldChange}
                    placeholder="Enter Institution Name"
                  />
                  {validationErrors.nameOfInstitution && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.nameOfInstitution}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Establishment{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      validationErrors.yearOfEstablishement
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="yearOfEstablishement"
                    value={formData.yearOfEstablishement}
                    onChange={handleFieldChange}
                    placeholder="Enter Establishment Year"
                  />
                  {validationErrors.yearOfEstablishement && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.yearOfEstablishement}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Affiliation Details / Name of the University{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="nameOfUniversity"
                    placeholder="Enter Affiliated University"
                    value={formData.nameOfUniversity}
                    onChange={handleFieldChange}
                  />
                  {validationErrors.nameOfUniversity && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.nameOfUniversity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Whether the institution is exclusively meant for students
                    from one gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="isGenderSpecific"
                    value={formData.isGenderSpecific}
                    onChange={handleFieldChange}
                  >
                    <option>Select Option</option>
                    <option value="Yes, only for girls">
                      Yes, only for girls
                    </option>
                    <option value="Yes, only for boys">
                      Yes, only for boys
                    </option>
                    <option value="Both">Both</option>
                  </select>
                  {validationErrors.isGenderSpecific && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.isGenderSpecific}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Whether The institution has NAAC status (Currently){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="hasNaacStatus"
                    value={formData.hasNaacStatus}
                    onChange={handleFieldChange}
                  >
                    <option>Select Option</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                  {validationErrors.hasNaacStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.hasNaacStatus}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    In Case Yes Please Give Grading Details{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="gradingDetails"
                    placeholder="Enter NAAC grading details"
                    value={formData.gradingDetails}
                    onChange={handleFieldChange}
                  />
                  {validationErrors.gradingDetails && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.gradingDetails}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                  onClick={handleStepNavigation}
                >
                  Save and Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 flex items-center">
              <User className="text-white mr-3" />
              <h3 className="text-lg font-semibold text-white">
                Officers Details
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of Vice Chancellor/Principal/Principal-Incharge{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="nameOfPrincipal"
                    placeholder="Enter Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="isFullTimePrincipal"
                  >
                    <option>Select Designation</option>
                    <option value="viceChancellor">Vice Chancellor</option>
                    <option value="principal">Principal</option>
                    <option value="Principal-Incharge">
                      Principal-Incharge
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="collegeEmail"
                    placeholder="Enter Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email-id of Head of the Institution{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="principalEmail"
                    placeholder="Enter Head's Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telephone No. (with STD Code)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="telephoneNumber"
                    placeholder="Enter Telephone Number"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                  onClick={handleStepNavigation}
                >
                  Save and Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-4 px-6 flex items-center">
              <MapPin className="text-white mr-3" />
              <h3 className="text-lg font-semibold text-white">
                College/University/Institute Address Details
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Of The Institution{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="locationOfInstitution"
                  >
                    <option>Select Option</option>
                    <option value="Rural">Rural</option>
                    <option value="Urban">Urban</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="addressLine1"
                    placeholder="Enter Address Line 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="addressLine2"
                    placeholder="Enter Address Line 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Locality/City/Town/Village{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="cityORvillage"
                    placeholder="Enter City/Town/Village"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="district"
                  >
                    <option>Select District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district.districtId}>
                        {district.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="pinCode"
                    placeholder="Enter PIN Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total area of Institutions (In Sq Ft){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="totalArea"
                    placeholder="Enter Total Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Constructed Area (In Sq Ft){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="totalConstructedArea"
                    placeholder="Enter Constructed Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="website"
                    placeholder="Enter Website URL"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                  onClick={handleStepNavigation}
                >
                  Save and Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 flex items-center">
              <Award className="text-white mr-3" />
              <h3 className="text-lg font-semibold text-white">Confirmation</h3>
            </div>

            <div className="p-6">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">
                  Please review all the information before submitting. Once
                  submitted, you will receive a confirmation email with your
                  registration details.
                </p>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="confirmation"
                  name="isConfirmed"
                  checked={formData.isConfirmed}
                  onChange={handleFieldChange}
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                    validationErrors.isConfirmed ? "border-red-500" : ""
                  }`}
                />
                <label
                  htmlFor="confirmation"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I confirm that all the information provided is accurate and
                  complete
                </label>
              </div>
              {validationErrors.isConfirmed && (
                <p className="text-red-500 text-sm mb-4">
                  {validationErrors.isConfirmed}
                </p>
              )}

              <div className="flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
                <button
                  className={`px-6 py-2 rounded-lg transition flex items-center ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-3">
                University Registration Portal
              </h3>
              <p className="text-sm text-gray-400">
                A comprehensive system for registering educational institutions
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-3">Contact Support</h4>
              <p className="text-sm">Email: support@university-portal.edu</p>
              <p className="text-sm">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-center text-gray-400">
            © {new Date().getFullYear()} University Registration Portal. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
