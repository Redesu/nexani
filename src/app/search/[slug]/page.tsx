'use client'

import { useParams, useRouter } from "next/navigation";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { useState } from "react";
import { Box, InputAdornment, LinearProgress, TextField, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import AnimeGrid from "@/components/AnimeGrid";
export default function SearchAnime() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
    const [searchQuery, setSearchQuery] = useState(slug);
    const { searchResults, loading: searchLoading, error: searchError } = useSearchAnime(slug, 700);
    const decodedQuery = decodeURIComponent(searchQuery);

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
                    value={decodedQuery}
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

            {searchLoading ? (
                <Box>
                    <LinearProgress color="success" />
                </Box>
            ) : (
                <>
                    {searchResults.length > 0 && (
                        <Box>
                            {slug && <h1>Search results for: {decodeURIComponent(slug)}</h1>}
                            <AnimeGrid animes={searchResults} />
                        </Box>
                    )}

                    {slug && !searchLoading && searchResults.length === 0 && (
                        <Box>
                            <h1>No results found for: {decodedQuery}</h1>
                        </Box>
                    )}

                    {searchError && (
                        <Box>
                            <h1>Error: {searchError}</h1>
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}