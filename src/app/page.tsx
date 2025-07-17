"use client";
import { useSeasonalAnime } from "@/hooks/useAnimeData";
import AnimeGrid from "@/components/AnimeGrid";
import { Box, CircularProgress } from "@mui/material";

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
│   ├── AnimeGrid.tsx       # Grid layout for anime  
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
  return (
    <Box sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <AnimeGrid animes={anime} />
      )
      }
    </Box>
  )
}