import React, { useEffect, useState } from "react";
import { logout } from "../../store/slice/authSlice";
import "../../style/admin/PrintApplication.css";
import { useDispatch } from "react-redux";
import { adminApi } from "../../api/utils/admin";

const PrintApplicationContainer = () => {
  const handlePrint = () => {
    window.print();
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [Data, SetuserData] = useState({});
  const [eduData, setEduData] = useState([]);
  // const registrationNo = new URLSearchParams(window.location.search).get(
  //   "registrationNo"
  // );

  const registrationNo = new URLSearchParams(window.location.search).get(
    "registrationNo"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let payload = {
          registrationNo: registrationNo,
        };

        const res = await adminApi.getCandidateDetails(payload);
        if (res.data.success) {
          SetuserData(res.data.data.userBasicInfoData);
          setEduData(res.data.data.userEducationdalData);
        } else {
          alert("Failed to fetch candidate details");
        }
      } catch (error) {}
    };
    fetchUserData();
  }, [registrationNo]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("registrationNo", registrationNo);
  //       let payload = { registrationNo };

  //       const res = await adminApi.getCandidateDetails(payload);

  //       if (res.data.success) {
  //         SetuserData(res.data.data.userBasicInfoData);
  //         console.log("Data", res.data.data.userBasicInfoData);
  //       } else {
  //         alert("Failed to fetch candidate details");
  //       }
  //     } catch (error) {
  //       console.error("API error:", error);
  //       alert("Something went wrong while fetching data");
  //     }
  //   };

  //   fetchData();
  // }, [registrationNo]);
  return (
    <div>
      <div className="application-container">
        <div className="header">
          <div className="logo logo-left">
            <img
              src="https://res.cloudinary.com/dcijhvlxh/image/upload/v1752213693/gov1_wjg3dg.png"
              alt="logo"
              style={{ width: "110px" }}
              height="130px"
            />
          </div>
          <h2>Bihar Government Madarsa Teacher Recruitment</h2>
          <h2>बिहार सरकार मदरसा शिक्षक भर्ती</h2>
          <div className="contact-info">
            Email: helpdesk@madarsa.co.in | Website:
            http://edu-madarsa-board.bihar.gov.in/
          </div>
          <div className="logo logo-right">
            <img src="https://i.ibb.co/R2y2KNf/image.png" alt="Logo" />
          </div>
        </div>
        <div className="content">
          <div className="photo-section">
            <div className="photo-placeholder">
              <img
                id="profile-image"
                src="https://state.bihar.gov.in/educationbihar/cache/18/HOME_IMAGES/sunil%20kumar%20(1).jpeg"
                alt="Profile Photo"
              />
            </div>
            <div className="signature-placeholder">
              <img
                id="signature-image"
                src="https://i.ibb.co/zTR9FhSs/IMG-20250221-211851.jpg"
                alt="Signature"
                style={{ width: "150px", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="form-section">
            <div className="section-title">
              <i className="fas fa-user" /> Personal Information
            </div>
            <div className="form-grid">
              <div className="form-field">
                <span className="form-label">Registration No:</span>
                <span className="form-value" id="regNo">
                  {Data.registrationNo}
                </span>
              </div>
              <div className="form-field full-width">
                <span className="form-label">Selected Standard:</span>
                <span className="form-value" id="standardName">
                  {Data.standardName}
                </span>
              </div>
              <div className="form-field full-width">
                <span className="form-label ">Applied Post:</span>
                <span className="form-value" id="postName">
                  {Data.postName}
                </span>
              </div>
              <div className="form-field full-width">
                <span className="form-label">Name:</span>
                <span className="form-value" id="applicantName">
                  {Data.fullName}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Father's Name:</span>
                <span className="form-value" id="fathersName">
                  {Data.fatherName}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Date of Birth:</span>
                <span className="form-value" id="dob">
                  {Data.dateOfBirth}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Gender:</span>
                <span className="form-value" id="gender">
                  {Data.gender}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Marital Status:</span>
                <span className="form-value" id="maritalStatus">
                  {" "}
                  {Data.maritalStatus}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Nationality:</span>
                <span className="form-value" id="nationality">
                  {" "}
                  INDIAN
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Home District:</span>
                <span className="form-value" id="homeDistrict">
                  {Data.homeDistrictName}
                </span>
              </div>
            </div>
            <div className="section-title">
              <i className="fas fa-id-card" /> Contact &amp; Identity Details
            </div>
            <div className="form-grid">
              <div className="form-field">
                <span className="form-label">Mobile Number:</span>
                <span className="form-value" id="mobile">
                  +91 {Data.mobileNumber}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Email ID:</span>
                <span className="form-value" id="email">
                  {Data.emailAddress}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">Aadhar Number:</span>
                <span className="form-value" id="aadhar">
                  {Data.adharNo}
                </span>
              </div>
              <div className="form-field">
                <span className="form-label">PAN Number:</span>
                <span className="form-value" id="pan">
                  {Data.panNo}
                </span>
              </div>
              <div className="form-field full-width">
                <span className="form-label">Correspondence Address:</span>
                <span className="form-value" id="correspondenceAddress">
                  {Data.addressLine1}, {Data.addressLine2}, {Data.pincode}
                </span>
              </div>
              <div className="form-field full-width">
                <span className="form-label">Permanent Address:</span>
                <span className="form-value" id="permanentAddress">
                  {Data.paddressLine1}, {Data.paddressLine2}, {Data.ppincode}
                </span>
              </div>
            </div>
            <div className="section-title">
              <i className="fas fa-graduation-cap" /> Educational Qualification
            </div>
            <table className="education-table" id="education-table">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Degree</th>
                  <th style={{ width: "20%" }}>Board/University</th>
                  <th style={{ width: "12%" }}>Year</th>
                  <th style={{ width: "12%" }}>Roll No.</th>
                  <th style={{ width: "10%" }}>Total Marks</th>
                  <th style={{ width: "10%" }}>Marks Obtained</th>
                  <th style={{ width: "8%" }}>Percentage%</th>
                  <th style={{ width: "13%" }}>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {eduData?.map((education, index) => (
                  <tr key={index}>
                    <td>{education.courseName}</td>
                    <td>{education.boardName}</td>
                    <td>{education.passingYear}</td>
                    <td>{education.rollNo}</td>
                    <td>{education.totalMarks}</td>
                    <td>{education.marksObtained}</td>
                    <td>{education.percentage}</td>
                    <td>
                      <a
                        href={education.document}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footer">
              <div className="signature-box">
                <div className="signature-line">Applicant's Signature</div>
              </div>
              <div className="signature-box">
                <div className="signature-line">Date: ___________</div>
              </div>
              <div className="signature-box">
                <div className="signature-line">Verification Officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="floating-btn" onClick={handlePrint}>
          <i className="fas fa-print" /> Print Application
        </button>
        <button className="floating-btn" id="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default PrintApplicationContainer;
