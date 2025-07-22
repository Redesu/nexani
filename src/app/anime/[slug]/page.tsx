'use client';

import { useParams } from "next/navigation";
import { Box, LinearProgress, useTheme } from "@mui/material";
import { useAnimeDetails } from "@/hooks/useAnimeDetails";
import AnimeDetailsComponent from "@/components/AnimeDetailsComponent";

export default function animeDetailsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
    const id = Number(slug.split('-')[0]);
    console.log("Using the id: ", id);
    const { animeDetails, loading, error } = useAnimeDetails(id);
    console.log("Found the anime details: ", animeDetails);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return(
        <Box>
            {loading && <LinearProgress color="success" />}
            {error && <p>{error}</p>}
            {animeDetails && <AnimeDetailsComponent animeDetails={animeDetails} />}
        </Box>
    )
}