"use client";
import { useSeasonalAnime } from "@/hooks/useSeasonalAnime";
import SeasonalAnimeSlide from "@/components/SeasonalAnimeSlide";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useTopUpcomingAnime } from "@/hooks/useTopUpcomingAnime";
import AnimeGrid from "@/components/AnimeGrid";
import { getCurrentSeason } from "@/utils/constants";


export default function Home() {
  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();
  const { anime, loading } = useSeasonalAnime(currentYear, currentSeason);
  const { topUpcomingAnime } = useTopUpcomingAnime();
  return (
    <Box sx={{ mt: 4 }}>
      {loading ? (
        <LinearProgress color="success" />
      ) : (
        <>
          <Box>
            <Typography variant="h3" sx={{ textAlign: 'center', color: "text.primary" }}>Seasonal Anime for {currentYear} {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}</Typography>
            <SeasonalAnimeSlide animes={anime} />
          </Box>
          <Box className="top upcoming-animes">
            <Typography variant="h4" sx={{ textAlign: 'left', marginLeft: '5px', color: "text.primary" }}>Top 20 upcoming animes</Typography>
            <AnimeGrid animes={topUpcomingAnime} />
          </Box>
        </>
      )
      }
    </Box>
  )
}