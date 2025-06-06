import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login/Login";
import Home from "@/pages/Home/Home";
import Games from "@/pages/Games/Games";
import Categories from "@/pages/Categories/Categories";
import Platforms from "@/pages/Platforms/Platforms";
import NotFound from "@/pages/NotFound/NotFound";
import { Auth } from "@/components/logic/Auth";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import UnprotectedRoutes from "@/routes/UnprotectedRoutes";
import { ToastContainer } from "react-toastify";

export default function App(): React.JSX.Element {
  return (
    <Auth>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route element={<UnprotectedRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/platforms" element={<Platforms />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Auth>
  );
}
