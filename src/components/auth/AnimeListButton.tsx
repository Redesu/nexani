import { useAuth } from "@/context/AuthContext";
import { Button, Box, MenuItem } from "@mui/material";


export default function AnimeListButton() {

    const { user } = useAuth();

    const handleAnimeList = () => {
        window.location.href = `/animelist/${user?.name}`
    }

    return (
        <MenuItem onClick={handleAnimeList}>Anime List</MenuItem>
    );
}