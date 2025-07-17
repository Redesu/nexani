import { Anime } from "@/lib/types/anime";
import { Card, Typography, CardMedia, CardContent, Button } from "@mui/material";

interface AnimeCardProps {
    anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <CardMedia component="img" image={anime.node.main_picture.large} alt={anime.node.title} height="140" />
                <Typography gutterBottom variant="h5" component="div">
                    {anime.node.title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AnimeCard;
