"use client";
import { useAuth } from "@/context/AuthContext";
import { Star, Cake, LocationOn, AccessTime, CheckCircle } from '@mui/icons-material';
import { Grid, Typography, Paper, Box, Stack, Chip, Avatar, Divider, CircularProgress } from '@mui/material';
import { useParams } from "next/navigation";


export default function UserProfile() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
    const { user, loadingContext } = useAuth();

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
                    User profile not found
                </Typography>
            </Box>
        );
    }
    const formatDate = (dateString: string | undefined | null): string => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date.getTime())
            ? 'N/A'
            : date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
    };

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: 'background.default', color: 'text.primary', minHeight: 'calc(100vh - 64px)' }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={user?.picture}
                        alt={user?.name}
                        sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, border: '3px solid', borderColor: 'primary.main' }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                        }}
                    />
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                            {user?.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Joined on {formatDate(user?.joined_at)}
                        </Typography>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: '16px' }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                            Profile Info
                        </Typography>
                        <Stack spacing={1.5}>
                            {user?.is_supporter && (
                                <Chip icon={<CheckCircle />} label="Supporter" color="success" variant="filled" size="small" sx={{ justifyContent: 'flex-start', p: 1 }} />
                            )}
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Cake fontSize="small" /> <strong>Birthday:</strong> {formatDate(user?.birthday)}</Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocationOn fontSize="small" /> <strong>Location:</strong> {user?.location || 'N/A'}</Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><AccessTime fontSize="small" /> <strong>Time Zone:</strong> {user?.time_zone || 'N/A'}</Typography>
                            <Typography variant="body2"><strong>Gender:</strong> {user?.gender || 'N/A'}</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px' }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Anime Statistics
                        </Typography>
                        {user?.anime_statistics ? (
                            <>
                                <Stack direction="row" sx={{ my: 2, alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                    <Chip
                                        icon={<Star />}
                                        label={`Mean Score: ${user.anime_statistics.mean_score}`}
                                        color="primary"
                                        sx={{ fontWeight: 'bold' }}
                                    />
                                    <Chip label={`Total Anime: ${user.anime_statistics.num_items}`} />
                                    <Chip label={`Episodes Watched: ${user.anime_statistics.num_episodes}`} />
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="h6" gutterBottom>Watch Status</Typography>
                                        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                                            <Chip label={`Watching: ${user.anime_statistics.num_items_watching}`} variant="outlined" color="info" />
                                            <Chip label={`Completed: ${user.anime_statistics.num_items_completed}`} variant="outlined" color="success" />
                                            <Chip label={`On Hold: ${user.anime_statistics.num_items_on_hold}`} variant="outlined" color="warning" />
                                            <Chip label={`Dropped: ${user.anime_statistics.num_items_dropped}`} variant="outlined" color="error" />
                                            <Chip label={`Plan to Watch: ${user.anime_statistics.num_items_plan_to_watch}`} variant="outlined" color="default" />
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="h6" gutterBottom>Time Spent</Typography>
                                        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                                            <Chip label={`Days Watched: ${user.anime_statistics.num_days.toFixed(2)}`} variant="outlined" />
                                            <Chip label={`Rewatched: ${user.anime_statistics.num_times_rewatched} times`} variant="outlined" />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No anime statistics available for this user.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );


}