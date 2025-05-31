import { useEffect, useCallback, JSX } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    onLogin: (isAuthenticated: boolean) => void;
}

export function Auth({ onLogin }: AuthProps): JSX.Element {
    const navigate = useNavigate();

    const { data: isAuthenticated, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: API.Auth,
        staleTime: 5 * 60 * 1000,
        retry: false
    });

    useEffect(() => {
        if (!isLoading) {
            const isAuth = Boolean(isAuthenticated);
            onLogin(isAuth);

            if (!isAuth) {
                navigate("/login");
            }
        }
    }, [isAuthenticated, navigate, onLogin]);

    return (
        <div>
            <Outlet />
        </div>
    );
}
