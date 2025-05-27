import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Categories from "./pages/Categories";
import Platforms from "./pages/Platforms";
import NotFound from "./pages/NotFound";
import { Auth } from "@/components/global/Auth";

export default function App(): React.JSX.Element {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin: () => void = (): void => {
    setIsLogged((is) => !is);
  };

  return (
    <Routes>
      {!isLogged && <Route path="/login" element={<Login onLogin={handleLogin} />} />}

      <Route element={<Auth onLogin={handleLogin} />}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/platforms" element={<Platforms />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
