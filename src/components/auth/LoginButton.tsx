import { Button, Box, MenuItem } from "@mui/material";


export default function LoginButton() {

    const handleLogin = () => {
        window.location.href = '/api/auth/login'
    }

    return (
        <MenuItem onClick={handleLogin}>Login</MenuItem>
    );
}