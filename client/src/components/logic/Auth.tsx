import { useEffect, JSX, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";

export function Auth({ children }: { children: ReactNode }): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: API.Auth,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    const isAuth = Boolean(isAuthenticated);

    if (!isAuth && location.pathname !== "/login") {
      toast.error("You need to be logged in to access this page!");
      navigate("/login");
    }

    if (isAuth && location.pathname === "/login") {
      toast.success("You are already logged in!");
      navigate("/");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
}
