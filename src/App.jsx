import { useLoading } from "./context/LoadingContext";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loader />}
      <AppRoutes />
    </>
  );
}

export default App;
