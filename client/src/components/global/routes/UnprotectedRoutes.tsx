import { Auth } from "@/components/global/Auth";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function UnprotectedRoutes() {
  return (
    <Auth>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <Outlet />
    </Auth>
  );
}
