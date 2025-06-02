import { Auth } from "@/components/global/Auth";
import { GlobalProvider } from "@/contexts/globalContext";
import { ModalProvider } from "@/contexts/modalContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function ProtectedRoutes() {
  return (
    <Auth>
      <GlobalProvider>
        <ModalProvider>
          <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
          <Outlet />
        </ModalProvider>
      </GlobalProvider>
    </Auth>
  );
}
