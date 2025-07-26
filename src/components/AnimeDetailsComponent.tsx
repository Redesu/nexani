import { AnimeDetails } from "@/lib/types/animeDetails";
import { Star } from "@mui/icons-material";
import { Grid, Typography, Paper, Box, Stack, Chip } from "@mui/material";
interface AnimeDetailsProps {
    animeDetails: AnimeDetails;
}

const AnimeDetailsComponent: React.FC<AnimeDetailsProps> = ({ animeDetails }) => {
    return (
        <Box sx={{
            flexGrow: 1, p: 3, backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)'
        }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h3" component="h1" gutterBottom color="text.primary">
                        {animeDetails.title}
                    </Typography>
                    <Typography variant="h5" component="h2" color="text.secondary">
                        {animeDetails.alternative_titles.ja}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        component="img"
                        src={animeDetails.main_picture.large}
                        alt={animeDetails.title}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '16px',
                            boxShadow: 6,
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Synopsis
                        </Typography>
                        <Typography variant="body1">
                            {animeDetails.synopsis}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ my: 2, alignItems: 'center' }}>
                            <Chip
                                icon={<Star />}
                                label={`Score: ${animeDetails.mean || 'N/A'}`}
                                color="primary"
                            />
                            <Chip label={`Episodes: ${animeDetails.num_episodes}`} />
                            <Chip label={`Status: ${animeDetails.status.replace(/_/g, ' ')}`} variant="outlined" />
                        </Stack>

                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                            Genres
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {animeDetails.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} size="small" />
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AnimeDetailsComponent;