import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Categories from "./pages/Categories";
import Platforms from "./pages/Platforms";
import NotFound from "./pages/NotFound";
import { Auth } from "@/components/global/Auth";

export default function App(): React.JSX.Element {
 
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/platforms" element={<Platforms />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
