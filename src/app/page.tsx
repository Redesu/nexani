"use client";
import { useSeasonalAnime } from "@/hooks/useSeasonalAnime";
import SeasonalAnimeSlide from "@/components/SeasonalAnimeSlide";
import { Box, colors, Container, LinearProgress, Typography } from "@mui/material";
import AnimeCard from "@/components/AnimeCard";
import { useTopUpcomingAnime } from "@/hooks/useTopUpcomingAnime";
import AnimeGrid from "@/components/AnimeGrid";
import { all } from "axios";

/**
 * 
 * src/  
├── app/  
│   ├── layout.tsx          # Root layout  
│   ├── page.tsx            # Homepage (seasonal anime)  
│   └── search/  
│       └── page.tsx        # Search page  
│  
├── components/  
│   ├── AnimeCard.tsx       # Reusable anime card  
│   ├── SeasonalAnimeSlide.tsx       # Grid layout for anime  
│   └── SearchBar.tsx       # Search input  
│  
├── lib/  
│   ├── api/  
│   │   ├── mal.ts          # MAL API client  
│   │   └── cache.ts        # Caching logic  
│   └── types/  
│       └── anime.ts        # TypeScript interfaces  
│  
├── hooks/  
│   └── useAnimeData.ts     # Custom hook for fetching anime  
│  
├── utils/  
│   └── constants.ts        # API endpoints, rate limits, etc.  
│  
└── styles/                 # Global CSS / Tailwind config  
 */

export default function Home() {
  const currentYear = new Date().getFullYear();
  const currentSeason = 'summer';
  const { anime, loading } = useSeasonalAnime(currentYear, currentSeason);
  const { topUpcomingAnime, loadingTopUpcoming } = useTopUpcomingAnime();
  return (
    <Box sx={{ mt: 4 }}>
      {loading ? (
        <LinearProgress color="success" />
      ) : (
        <>
          <Box>
            {/* <h1 style={{ textAlign: 'center', color: 'black' }}>Seasonal Anime for {currentYear} {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}</h1> */}
            <Typography variant="h3" sx={{ textAlign: 'center', color: "text.primary" }}>Seasonal Anime for {currentYear} {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}</Typography>
            <SeasonalAnimeSlide animes={anime} />
          </Box>
          <Box className="top upcoming-animes">
            {/* <h1 style={{ textAlign: 'left', marginLeft: '5px', color: 'black' }}>Top 20 upcoming animes</h1> */}
            <Typography variant="h4" sx={{ textAlign: 'left', marginLeft: '5px', color: "text.primary" }}>Top 20 upcoming animes</Typography>
            <AnimeGrid animes={topUpcomingAnime} />
          </Box>
        </>
      )
      }
    </Box>
  )
}