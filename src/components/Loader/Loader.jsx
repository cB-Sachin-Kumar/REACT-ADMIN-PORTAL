import { Loader2 } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";

const Loader = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center space-y-4 min-w-[200px]">
        <Loader2
          className={`${sizeClasses[size]} text-blue-600 animate-spin`}
        />
        <p className="text-gray-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default Loader;

// Example pattern
// showLoading();
// try {
//   await someAsyncTask();
// } finally {
//   hideLoading();
// }
