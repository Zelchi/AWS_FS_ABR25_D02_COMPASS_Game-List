import { useEffect, useCallback, JSX } from "react";
import { Outlet } from "react-router-dom";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    onAuth: () => void;
    onLogin: () => void;
    Auth: boolean;
    Login: boolean;
}

export function Auth({ onAuth, onLogin, Auth, Login }: AuthProps): JSX.Element {

    const navigate = useNavigate();

    const checkAuth = useCallback(async () => {
        const isAuthenticated = await API.Auth();
        if (isAuthenticated) {
            onAuth();
            onLogin();
        } else {
            navigate('/login');
        }
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
