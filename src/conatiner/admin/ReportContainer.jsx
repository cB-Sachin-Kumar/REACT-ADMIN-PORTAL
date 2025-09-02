import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLoading } from "../../context/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { useDistricts } from "../../hooks/useDistrict";
import { adminApi } from "../../api/utils/admin";

const ReportConatiner = () => {
  const { districts } = useDistricts();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [loading, setLoading] = useState(false);

  const standards = ["WASTANIA", "FAUQUANIA", "MOULVI", "ALIM", "FAZIL"];

  const getData = async () => {
    setLoading(true);
    try {
      const payload = {
        districtId: selectedDistrict,
        standard: selectedStandard,
      };
      const res = await adminApi.getReport(payload);
      setTableData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    getData();
  };

  const handleTakeAction = async (registrationNo) => {
    try {
      setLoading(true);
      const payload = {
        registrationNo: registrationNo,
      };
      const response = await adminApi.getCandidateDetails(payload);
      if (response.data.success) {
        //if api success saved candidates details into state
        setSelectedCandidate(response.data.data.userBasicInfoData);
        setShowModal(true);
      } else {
        alert("Failed to fetch candidate details");
      }
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      alert("Error occurred while fetching candidate details");
    }
  };

  // const handleVerifyCandidate = async (registrationNo) => {
  //   try {
  //     setLoading(true);
  //     const payload = {
  //       registrationNo: registrationNo,
  //     };
  //     const response = await adminApi.verifyCandidate(payload);
  //     if (response.data.success) {
  //       alert("Candidate Verified Successfully");
  //       setShowModal(false);
  //       getData();
  //     } else {
  //       alert("Failed to verify candidate");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying candidate:", error);
  //     alert("Error occurred while verifying candidate");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleVerifyCandidate = async (registrationNo) => {
    try {
      setLoading(true);
      const payload = {
        registrationNo: registrationNo,
      };

      const res = await adminApi.handleVerifyCandidate(payload);
      if (res.data.success) {
        alert("Candidate Verified Successfully");
        setShowModal(false);
        getData();
      } else {
        alert("Failed to verify candidate");
      }
    } catch (error) {
      console.error("Error verifying candidate:", error);
      alert("Error occurred while verifying candidate");
    }
  };

  const handleRejectCandidate = async (registrationNo) => {
    try {
      const payload = {
        registrationNo: registrationNo,
        reason: "rejected",
      };
      const res = await adminApi.handleRejectCandidate(payload);
      if (res.data.success) {
        alert("Candidate Rejected Successfully");
        setShowModal(false);
        getData();
      } else {
        alert("Failed to reject candidate");
      }
    } catch (error) {
      console.error("Error rejecting candidate:", error);
      alert("Error occurred while rejecting candidate");
    }
  };

  const handlePrintApplication = (registrationNo) => {
    window.open(
      `/admin/print-application?registrationNo=${registrationNo}`,
      "_blank"
    );
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    // Prepare data
    const excelData = [
      // Header row
      [
        "S.No",
        "Roll Number",
        "Candidate Name",
        "Father Name",
        "District",
        "Standard",
        "Application Date",
        "Status",
      ],
      // Data rows
      ...tableData.map((candidate, index) => [
        index + 1,
        candidate.rollNumber,
        candidate.candidateName,
        candidate.fatherName,
        candidate.district,
        candidate.standard,
        candidate.applicationDate,
        candidate.status,
      ]),
    ];
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // Set column widths
    worksheet["!cols"] = [
      { width: 8 }, // S.No
      { width: 15 }, // Roll Number
      { width: 20 }, // Candidate Name
      { width: 20 }, // Father Name
      { width: 15 }, // District
      { width: 12 }, // Standard
      { width: 15 }, // Application Date
      { width: 12 }, // Status
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "District Report");

    const fileName = `District_Report_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };
  return (
    <div className="w-full mt-4 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-gray-900 text-2xl font-bold">
            District Wise Admin Report Of Applied Candidates:
          </h1>
        </div>
        <div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="text-blue-600 hover:text-blue-800 no-underline"
                >
                  Home/AdminReport
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md border border-green-500">
          <div className="bg-green-500 text-white px-6 py-4 rounded-t-lg">
            <h2 className="text-lg font-bold mb-0">
              Choose District And Get Report Of Applied Candidates
            </h2>
          </div>
          <div className="p-6">
            <div className="bg-white rounded-lg border border-blue-500 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="district"
                    className="block text-red-600 font-bold mb-2"
                  >
                    Choose your District:
                  </label>
                  <select
                    id="district"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    required
                  >
                    <option value="">ALL District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district.districtId}>
                        {district.district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="standard"
                    className="block text-red-600 font-bold mb-2"
                  >
                    Choose your Standard:
                  </label>
                  <select
                    id="standard"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStandard}
                    onChange={(e) => setSelectedStandard(e.target.value)}
                    required
                  >
                    <option value="">ALL Standard</option>
                    {standards.map((standard, index) => (
                      <option key={index} value={standard}>
                        {standard}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-red-600 font-bold mb-4">
                  Note: Please Wait When You Click On Export to Excel Button It
                  Takes Some Time.
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {tableData.length > 0 && (
        <div className="w-full mt-6">
          <div className="bg-white rounded-lg shadow-md border border-blue-500">
            <div className="p-6">
              <div className="mb-4">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={exportToExcel}
                >
                  Export to Excel
                </button>
              </div>

              {/* ✅ Scrollbar will appear only here */}
              <div
                className="max-w-full overflow-x-auto"
                style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
              >
                <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-800 text-white sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          S.No
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Registration No
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Candidate Name
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Father's Name
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          District
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Standard
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Aadhar No
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Final Submitted
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Action
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-300">
                          Print Application
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((candidate, index) => (
                        <tr
                          key={candidate.id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-4 py-3 border-b border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.registrationNo}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.fullName}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.fatherName}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.homeDistrictName}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.standardName}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            {candidate.adharNo}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                candidate.finalSubmit === "YES"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {candidate.finalSubmit}
                            </span>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors"
                              onClick={() =>
                                handleTakeAction(candidate.registrationNo)
                              }
                            >
                              Take Action
                            </button>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300">
                            <button
                              className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors"
                              onClick={() =>
                                handlePrintApplication(candidate.registrationNo)
                              }
                            >
                              Print Application
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Verify Candidate Details
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "70vh" }}>
              {selectedCandidate && (
                <div className="w-full">
                  <h3 className="text-lg font-medium mb-4">
                    Candidate Information:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p>
                        <span className="font-semibold">Registration No:</span>{" "}
                        {selectedCandidate.registrationNo}
                      </p>
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedCandidate.fullName}
                      </p>
                      <p>
                        <span className="font-semibold">Father's Name:</span>{" "}
                        {selectedCandidate.fatherName}
                      </p>
                      <p>
                        <span className="font-semibold">District:</span>{" "}
                        {selectedCandidate.homeDistrictName}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p>
                        <span className="font-semibold">Current Status:</span>
                        <span
                          className={`inline-block ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedCandidate.status === "Verified"
                              ? "bg-green-100 text-green-800"
                              : selectedCandidate.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {selectedCandidate.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-4">
                      Actions Available:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          handleVerifyCandidate(
                            selectedCandidate.registrationNo
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() =>
                          handleRejectCandidate(
                            selectedCandidate.registrationNo
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportConatiner;
