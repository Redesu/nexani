'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, InputAdornment, TextField, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const theme = useTheme();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            router.push(`/search/${query}`);
        }
    };

    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box>
            <form onSubmit={handleSearchSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Search..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    slotProps={
                        {
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : 'inherit' }} />
                                    </InputAdornment>
                                )
                            }
                        }
                    }
                    sx={{
                        marginTop: '20px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        },

                        ...(!isDarkMode && {
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                    borderColor: theme.palette.grey[400],
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.grey[600],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#000000',
                            },
                            '& .MuiInputLabel-root': {
                                color: theme.palette.grey[700],
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.primary.main,
                            },
                        })
                    }}
                />
            </form>
        </Box>
    )
}