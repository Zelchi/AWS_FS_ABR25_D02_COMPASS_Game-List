import { useEffect, useCallback, JSX } from "react";
import { Outlet } from "react-router-dom";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    onLogin: (isAuthenticated: boolean) => void;
}

export function Auth({ onLogin }: AuthProps): JSX.Element {
    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const isAuthenticated = await API.Auth();
        const isAuth = Boolean(isAuthenticated);

        onLogin(isAuth);

        if (!isAuth) return navigate("/login");
    }, []);

    useEffect(() => {

        checkAuth();

    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}
