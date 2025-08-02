'use client';

import { useParams } from "next/navigation";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useAnimeDetails } from "@/hooks/useAnimeDetails";
import AnimeDetailsComponent from "@/components/AnimeDetailsComponent";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ErrorOutline } from "@mui/icons-material";

export default function AnimeDetailsPage() {
    const params = useParams();

    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
    const extractedId = slug.split('-')[0];

    const isValidId = /^\d+$/.test(extractedId);
    const id = isValidId ? Number(extractedId) : NaN;


    const { animeDetails, loading, error } = useAnimeDetails(isValidId ? id : null);

    useEffect(() => {
        if (!isValidId) {
            redirect('/')
        }
    }, [isValidId]);

    if (!isValidId) {
        return <LinearProgress color="success" />
    }

    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                textAlign: 'center',
                p: 3
            }}>
                <ErrorOutline color="error" sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
                    Server Error
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'error.main' }}>
                    Could not fetch the anime details.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </Box>
        )
    }

    return (
        <Box>
            {loading && <LinearProgress color="success" />}
            {error && <p>{error}</p>}
            {animeDetails && <AnimeDetailsComponent animeDetails={animeDetails} />}
        </Box>
    )
}