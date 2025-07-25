import { useAuth } from "@/context/AuthContext";
import { Button, Box, MenuItem } from "@mui/material";


export default function ProfileButton() {

    const { user } = useAuth();

    const handleProfile = () => {
        window.location.href = `/profile/${user?.name}`
    }

    return (
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
    );
}