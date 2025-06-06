import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/contexts/globalContext";
import { ModalProvider } from "@/contexts/modalContext";

export default function ProtectedRoutes() {
  return (
    <GlobalProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </GlobalProvider>
  );
}
