    'use client'

    import { useRouter } from "next/navigation";
    import { useState, useEffect } from "react";
    import { Box, TextField } from "@mui/material";
    export default function SearchPage() {
        const [searchQuery, setSearchQuery] = useState('');
        const router = useRouter();

        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            setSearchQuery(event.target.value);
        };

        const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const query = searchQuery.trim();
            if (query){
                router.push(`/search/${query}`);
            }
        };

        return (
            <Box>
                <form onSubmit={handleSearchSubmit}>
                    <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                        width: '100%',
                        marginBottom: '20px',
                        marginTop: '20px'
                    }}
                    />
                </form>
            </Box>
        )
    }