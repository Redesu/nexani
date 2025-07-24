import { Button, Box } from "@mui/material";


export default function LoginButton() {
    return (
        <Button variant="contained" href="/api/auth/login">Login with MyAnimeList</Button>
    );
}