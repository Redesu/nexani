"use client";
import { useSeasonalAnime } from "@/hooks/useSeasonalAnime";
import SeasonalAnimeSlide from "@/components/SeasonalAnimeSlide";
import { Box, Container, LinearProgress } from "@mui/material";
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
            <h1 style={{ textAlign: 'center' }}>Seasonal Anime for {currentYear} {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}</h1>
            <SeasonalAnimeSlide animes={anime} />
          </Box>
          <Box className="top upcoming-animes">
            <h1 style={{ textAlign: 'left', marginLeft: '5px' }}>Top 20 upcoming animes</h1>
            <AnimeGrid animes={topUpcomingAnime} />
          </Box>
        </>
      )
      }
    </Box>
  )
}