    'use client'

    import { useParams, useRouter } from "next/navigation";
    import { useSearchAnime } from "@/hooks/useSearchAnime";
    import { useState, useEffect } from "react";
    import { Box, LinearProgress, TextField } from "@mui/material";
    import AnimeGrid from "@/components/AnimeGrid";
    export default function Search() {
        const params = useParams();
        const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
        const [searchQuery, setSearchQuery] = useState(slug);
        const { searchResults, loading: searchLoading, error: searchError } = useSearchAnime(slug, 700);
        const decodedQuery = decodeURIComponent(searchQuery);

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
                    value={decodedQuery}
                    onChange={handleSearchChange}
                    sx={{
                        width: '100%',
                        marginBottom: '20px',
                        marginTop: '20px'
                    }}
                    />
                </form>

                {searchLoading ? (
                    <Box>
                        <LinearProgress color="success" />
                        </Box>
                ) : (
                    <>
                    {searchQuery && searchResults.length > 0 && (
                        <Box>
                            <h1>Search results for: {decodedQuery}</h1>
                            <AnimeGrid animes={searchResults} />
                        </Box>
                    )}
                    {searchQuery && searchResults.length === 0 && (
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