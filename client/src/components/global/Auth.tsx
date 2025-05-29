import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import API from "../../utils/API";

interface AuthProps {
    onAuth: () => void;
    onLogin: boolean;
}

export function Auth({ onAuth, onLogin }: AuthProps): React.JSX.Element {

    useEffect(() => {
        const checkAuth = async () => {

            await API.Auth({ setAuth: onAuth });

        };

        checkAuth();
    }, [onLogin]);

    return (
        <div>
            <Outlet />
        </div>
    );
}
