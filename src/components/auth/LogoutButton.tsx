import { useAuth } from "@/context/AuthContext";
import { Button, CircularProgress, MenuItem } from "@mui/material";
import { useState } from "react";

export default function LogoutButton() {
    const { setUser } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {

            const response = await fetch('/api/auth/logout');

            if (response.ok) {
                setUser(null);
                window.location.href = '/'
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during the logout:', error);
        } finally {
            setIsLoggingOut(false);
        }

    }

    return (
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? <CircularProgress size={20} color="inherit" /> : 'Logout'}
        </MenuItem>
    )
}