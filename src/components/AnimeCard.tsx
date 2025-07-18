import { Anime } from "@/lib/types/anime";
import { Card, Typography, CardMedia, Box } from "@mui/material";
interface AnimeCardProps {
    anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "transparent",
                boxShadow: "none",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                objectFit: "cover",
                "&:hover": {
                    transform: "scale(1.02)",
                }
            }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${anime.node.main_picture.large})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(5px)',
                        transform: 'scale(1.1)',
                        zIndex: 0,
                    }}
                />
                <CardMedia
                    component="img"
                    width="100%"
                    image={anime.node.main_picture.large}
                    alt={anime.node.title}
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        borderRadius: '12px',
                        height: '400px',
                        objectFit: 'contain',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}
                />
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    borderRadius: '0 0 12px 12px'
                }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {anime.node.title}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default AnimeCard;
