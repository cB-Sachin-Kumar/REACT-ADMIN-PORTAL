import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser, clearError } from "../../store/slice/authSlice";
import { useLoading } from "../../context/LoadingContext";
import { useDistricts } from "../../hooks/useDistrict";
import Swal from "sweetalert2";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const { districts } = useDistricts();
  const { loading, error } = useSelector((state) => state.auth);
  const { showLoading, hideLoading } = useLoading();

  const [formData, setFormData] = useState({
    mobileNo: "",
    adharNo: "",
    name: "",
    districtId: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData, //..formData part is the spread operator.It copies the current formData object so you don’t lose the other fields when updating one field.
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Confirm Registration",
      html: `
      <div style="text-align:center">
        <p><strong>Full Name:</strong> ${formData.name || "-"}</p>
        <p><strong>Mobile:</strong> ${formData.mobileNo || "-"}</p>
        <p><strong>Aadhaar:</strong> ${formData.adharNo || "-"}</p>
      </div>
    `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, register",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6b21a8",
      reverseButtons: true,
      focusCancel: true,
    });
    // (!) = NOT operator in JavaScript.
    // It flips the value:
    // true → false
    // false → true
    // So
    // If user did NOT confirm (isConfirmed = false),
    // then !result.isConfirmed = true → code runs return; (exit function).
    // If user confirmed → condition is false, so it continues to API call.
    if (!result.isConfirmed) return;
    try {
      const res = await dispatch(signupUser(formData)).unwrap();
      //unwrap() → returns actual response or throws error (instead of storing in Redux only).
      if (res?.status === "success") {
        await Swal.fire({
          icon: "success",
          title: "Registartion Successful!",
          html: `Please note your Registration No: <b>${res?.data?.registrationNo}</b> for future reference.`,
        });
      }
      // The ?. is optional chaining (safe way to access properties).
      // If res is null or undefined, it won’t crash.
    } catch (err) {
      const msg =
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        "Something went wrong";
      await Swal.fire({ icon: "error", title: "Signup failed", text: msg });
    }
  };

  return (
    <>
      {/* Include Tailwind CSS */}
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>

      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl w-full max-w-7xl mx-auto">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-5xl xl:max-w-3xl z-10">
          {/* <div className="flex justify-center mb-2">
            <img
              src="https://university-hrms.thecodebucket.com/images/gov1.png"
              alt="Company Logo"
              className="h-20 w-auto"
            />
          </div> */}
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-2 font-semibold text-5xl text-white">
              Welcome Back! 🤩
            </h1>
            <p className="pr-4 text-sm opacity-75 text-center text-white">
              Loin to Continue ....
            </p>
          </div>
        </div>

        <div className="flex justify-center self-center z-10 mt-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-[29rem]">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign Up</h3>
              <p className="text-gray-400">
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Log in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <input
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="Enter Mobile Number"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>

              <div className="space-y-7">
                <input
                  placeholder="Enter Aadhar Number"
                  type={showPassword ? "text" : "password"}
                  name="adharNo"
                  value={formData.adharNo}
                  onChange={handleChange}
                  maxLength={12}
                  pattern="[0-9]{12}"
                  className="text-sm text-gray-800 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                  required
                />

                <div className="mt-4">
                  <input
                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <select
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  name="districtId"
                  value={formData.districtId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select District</option>
                  {(Array.isArray(districts) ? districts : []).map(
                    (district) => (
                      <option
                        key={district.districtId}
                        value={district.districtId}
                      >
                        {district.district}
                      </option>
                    )
                  )}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signup In..." : "Register"}
                </button>
              </div>
            </form>

            <div className="mt-7 text-center text-black-300 text-xs">
              <span>
                Copyright © 2021-2023{" "}
                <a
                  href="https://codebucket-solutions.com/"
                  rel=""
                  target="_blank"
                  title="Codepen aji"
                  className="text-purple-500 hover:text-purple-600"
                >
                  Codebucket Solutions
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
        <div className="container p-5 mx-auto flex items-center justify-between">
          <div className="flex mr-auto">
            <a
              href="https://codepen.io/uidesignhub"
              target="_blank"
              title="codepen aji"
              className="text-center text-gray-700 focus:outline-none"
            ></a>
          </div>
        </div>
      </footer>

      <svg
        className="absolute bottom-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>

      {/* Alpine.js for interactive elements */}
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"></script>
    </>
  );
};

export default SignupContainer;
