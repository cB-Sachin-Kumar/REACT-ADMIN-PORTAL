import React, { useState } from "react";
import { useLoading } from "../../context/LoadingContext";

const UploadDataContainer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { setLoading } = useLoading();

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setSelectedFile(file);
    } else {
      alert("Bhai, sirf Excel file daal, yeh kya daal diya😒?");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Bhai, sirf Excel file daal, yeh kya daal diya😒?");
      return;
    }

    setLoading(true);

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const response = await fetch('/api/upload-pension', {
      //   method: 'POST',
      //   body: formData
      // });

      alert("File uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-blue-600 text-3xl font-bold">
            Bulk Upload Pension
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
                  Home/Upload-Data
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
            <h2 className="text-lg font-bold mb-0">Bulk Upload Pension</h2>
          </div>

          <div className="p-6">
            <div className="bg-white rounded-lg border border-blue-500 p-6">
              {/* Upload Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 text-center">
                <h3 className="text-gray-900 text-2xl font-medium mb-4">
                  Please Download{" "}
                  <span className="text-red-600 font-bold">
                    Updated Excel Format
                  </span>{" "}
                  and Ensure Excel Format Is Same As Below and All Mandatory
                  Fields Must be Fill Before Uploading.
                </h3>
                <p className="text-red-600 text-lg font-medium mb-6">
                  Please Read, View and Follow the Instructions Before Uploading
                  Any File.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <a
                    href="/file/pension.xlsx"
                    download
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors no-underline"
                  >
                    Download Excel Format
                  </a>
                  <a
                    href="/file/pensioninstruction.xlsx"
                    download
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors no-underline"
                  >
                    View Instruction
                  </a>
                </div>

                {/* Upload Section */}
                <h4 className="text-gray-900 text-xl font-medium mb-2">
                  Upload your file
                </h4>
                <p className="text-red-600 text-sm mb-6">
                  File should be an Excel
                </p>

                {/* Drop Zone */}
                <div
                  className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    isDragOver
                      ? "bg-blue-50 border-gray-600"
                      : "bg-white border-blue-300 hover:bg-blue-50 hover:border-gray-600"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <span className="text-red-600 text-xl font-bold mb-2">
                    Upload files here
                  </span>
                  <span className="text-gray-600 mb-4">or</span>

                  <input
                    type="file"
                    id="file-input"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="w-full max-w-sm">
                    <div className="bg-white border border-gray-300 rounded-lg p-2">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-4 transition-colors"
                          onClick={() =>
                            document.getElementById("file-input").click()
                          }
                        >
                          Choose File
                        </button>
                        <span className="text-gray-600 text-sm truncate">
                          {selectedFile ? selectedFile.name : "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                {selectedFile && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                      <strong>Selected File:</strong> {selectedFile.name}
                    </p>
                    <p className="text-green-600 text-sm">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`px-6 py-3 rounded-md transition-colors ${
                selectedFile
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Pension File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDataContainer;
