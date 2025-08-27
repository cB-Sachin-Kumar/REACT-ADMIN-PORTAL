import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, clearError } from "../../store/slice/authSlice";
import { useLoading } from "../../context/LoadingContext";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  User,
  Shield,
} from "lucide-react";

const LoginContainer = () => {
  // Simulated states for demo (replace with actual Redux/context in real app)
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { isLoading, showLoading, hideLoading } = useLoading();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    mobileNumber: "",
    aadharNumber: "",
    ip: "51415522",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Carousel images and content
  const carouselData = [
    {
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Digital Governance",
      subtitle: "Transforming public services through technology",
    },
    {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Smart Solutions",
      subtitle: "Innovative approaches for modern administration",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Secure Access",
      subtitle: "Protected systems for authorized personnel",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Reset form when user type changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userName: "",
      password: "",
      mobileNumber: "",
      aadharNumber: "",
    }));
  }, [userType]);

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading, showLoading, hideLoading]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === "mobileNumber") {
      next = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "aadharNumber") {
      next = value.replace(/\D/g, "").slice(0, 12);
    }
    setFormData({
      ...formData,
      [name]: next,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload;

    if (userType === "admin") {
      payload = {
        userType,
        userName: formData.userName,
        password: formData.password,
        ip: formData.ip,
      };
    } else {
      payload = {
        userType,
        mobileNumber: formData.mobileNumber,
        aadharNumber: formData.aadharNumber,
        ip: formData.ip,
      };
    }

    const loginPromise = dispatch(loginUser(payload)).unwrap();

    toast.promise(loginPromise, {
      loading: "Checking credentials...",
      success: <b>Login successful!</b>,
      error: (err) =>
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        "Login failed. Please try again.",
    });

    try {
      await loginPromise;
      // Optional: navigate after success
      // navigate('/dashboard');
    } catch (err) {
      // We already showed a toast in error case; no need to do anything else here
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Welcome Section with Carousel */}
        <div className="flex-1 flex flex-col justify-start items-start pt-4 p-8 lg:p-16 relative min-h-screen">
          <div className="max-w-2xl w-full mx-auto mt-0">
            {/* Logo */}
            <div className="flex justify-center -mt-14">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
                <img
                  src="https://university-hrms.thecodebucket.com/images/gov1.png"
                  alt="Company Logo"
                  className="h-16 w-auto"
                />
              </div>
            </div>

            {/* Welcome Text - At the very top */}
            <div className="text-center text-white space-y-3 mb-6">
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Welcome Back! 👋
              </h1>
            </div>

            {/* Carousel Container */}
            <div className="relative mt-0">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative h-64 lg:h-80">
                  {carouselData.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                          {slide.title}
                        </h2>
                        <p className="text-lg lg:text-xl opacity-90">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-110"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 max-h-screen overflow-y-auto">
          <div className="w-full max-w-sm">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 lg:p-6">
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Sign In
                </h3>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

              {/* User Type Selection */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Login as:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="user"
                      checked={userType === "user"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
                        userType === "user"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <User className="w-3 h-3 mr-1" />
                      <span className="font-medium text-xs">User</span>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="admin"
                      checked={userType === "admin"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
                        userType === "admin"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      <span className="font-medium text-xs">Admin</span>
                    </div>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Dynamic Input Fields based on user type */}
                {userType === "user" ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Aadhar Number
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhar number"
                        maxLength="12"
                        pattern="[0-9]{12}"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-3 py-2 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end py-1">
                      <a
                        href="#"
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                    {typeof error === "string"
                      ? error
                      : error?.message ||
                        error?.data?.message ||
                        "Something went wrong"}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                    isLoading ? "opacity-50 cursor-not-allowed scale-100" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                      <span className="text-xs">Signing In...</span>
                    </div>
                  ) : (
                    <span className="text-sm">{`Sign in as ${
                      userType === "user" ? "User" : "Admin"
                    }`}</span>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center space-x-4 my-3">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <span className="text-gray-400 font-medium text-xs">or</span>
                  <div className="h-px w-12 bg-gray-200"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 text-xs">
                      Google
                    </span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z"
                        fill="#1877f2"
                      />
                      <path
                        d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92V64.104z"
                        fill="#f1f1f1"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 text-xs">
                      Facebook
                    </span>
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-4 text-center text-xs text-gray-500">
                <span>
                  Copyright © 2021-2023{" "}
                  <a
                    href="https://codebucket-solutions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Codebucket Solutions
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 lg:h-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,255,255,0.1)"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default LoginContainer;
