import { useEffect, useCallback, JSX } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Auth(): JSX.Element {
    const navigate = useNavigate();

    const { data: isAuthenticated, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: API.Auth,
        staleTime: 5 * 60 * 1000,
        retry: false
    });

    useEffect(() => {
        if (isLoading) return;

        const isAuth = Boolean(isAuthenticated);

        if (!isAuth && window.location.pathname !== "/login") {
            toast.error("You need to be logged in to access this page!");
            setTimeout(() => {
                navigate("/login");
            }, 10);
        }

        if (isAuth && window.location.pathname === "/login") {
            toast.success("You are already logged in!");
            setTimeout(() => {
                navigate("/");
            }, 10);
        }

    }, [isAuthenticated]);

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="dark"
            />
            <Outlet />
        </div>
    );
}
