import React, { useState } from 'react';
import Link from 'next/link';
import { useUserAnimeList } from '@/hooks/useUserAnimeList';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    Stack,
    Tabs,
    Tab,
    Paper
} from '@mui/material';
import { Star, Tv, Update, PlayCircleOutline } from '@mui/icons-material';
import { AnimeListStatus } from '@/lib/types/AnimeListStatus';
import { AnimeListStatusType } from '@/lib/types/AnimeListStatusType';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const statusTitles: { [key: string]: string } = {
    watching: 'Currently Watching',
    completed: 'Completed Anime',
    on_hold: 'On Hold',
    dropped: 'Dropped',
    plan_to_watch: 'Plan to Watch'
};


export function AnimeListComponent() {
    const [status, setStatus] = useState<AnimeListStatusType>("watching");
    const { userAnimeList, loading, error } = useUserAnimeList(status);
    const { user, loadingContext } = useAuth();
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';

    const handleTabChange = (event: React.SyntheticEvent, newValue: AnimeListStatusType) => {
        setStatus(newValue);
    };

    if (loadingContext) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!loadingContext && slug !== user?.name) {
        return (
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: 'background.default', color: 'text.primary', minHeight: 'calc(100vh - 64px)' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mt: 4, textAlign: 'center' }}>
                    User anime list not found
                </Typography>
            </Box>
        );
    }

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>Error: {error}</Alert>;
        }

        if (!userAnimeList || userAnimeList.length === 0) {
            return <Alert severity="info" sx={{ mt: 2, borderRadius: '12px' }}>You have no anime in this list.</Alert>;
        }

        return (
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {userAnimeList.map((anime: AnimeListStatus) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={anime.node.id}>
                        <Link href={`/anime/${anime.node.id}`}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '16px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 280, objectFit: 'cover', minHeight: '70vh' }}
                                    image={anime.node.main_picture.large}
                                    alt={anime.node.title}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1, mb: 2 }}>
                                        {anime.node.title}
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        <Chip
                                            icon={<Star fontSize="small" />}
                                            label={`Score: ${anime.list_status.score > 0 ? anime.list_status.score : 'Not Rated'}`}
                                            color="primary"
                                            variant="filled"
                                            size="small"
                                        />
                                        <Chip
                                            icon={<Tv fontSize="small" />}
                                            label={`Progress: ${anime.list_status.num_episodes_watched} / ${anime.node.num_episodes || '?'}`}
                                            color="info"
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pt: 1 }}>
                                            <Update sx={{ fontSize: '1rem' }} />
                                            Updated: {new Date(anime.list_status.updated_at).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: 'background.default', color: 'text.primary', minHeight: 'calc(100vh - 64px)' }}>
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PlayCircleOutline fontSize="large" /> Anime List
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {statusTitles[status]}
                </Typography>
            </Box>


            <Paper elevation={2} sx={{ borderRadius: '16px', mb: 4, overflow: 'hidden' }}>
                <Tabs
                    value={status}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="anime list status tabs"
                >
                    <Tab label="Watching" value="watching" />
                    <Tab label="Completed" value="completed" />
                    <Tab label="On Hold" value="on_hold" />
                    <Tab label="Dropped" value="dropped" />
                    <Tab label="Plan to Watch" value="plan_to_watch" />
                </Tabs>
            </Paper>

            {renderContent()}
        </Box>
    );
}