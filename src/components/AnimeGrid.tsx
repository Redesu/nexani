import { Anime } from "@/lib/types/anime";
import { Grid, Alert } from "@mui/material";
import AnimeCard from "./AnimeCard";

interface AnimeGridProps {
    animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
    if (!animes || animes.length === 0) {
        return <Alert severity="info">No results found</Alert>;
    }

    return (
        <Grid container spacing={2}>
            {animes.map((anime) => (

                <Grid container key={anime.node.id} spacing={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <AnimeCard anime={anime} />
                </Grid>
            ))}
        </Grid>
    )
}

export default AnimeGrid;