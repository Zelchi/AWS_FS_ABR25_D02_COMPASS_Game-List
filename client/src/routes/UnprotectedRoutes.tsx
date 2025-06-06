import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function UnprotectedRoutes() {
  return (
    <>
      <Outlet />
    </>
  );
}
