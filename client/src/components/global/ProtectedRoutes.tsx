import { Auth } from "@/components/global/Auth";
import { GlobalProvider } from "@/contexts/globalContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function ProtectedRoutes() {
  return (
    <Auth>
      <GlobalProvider>
        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        <Outlet />
      </GlobalProvider>
    </Auth>
  );
}
