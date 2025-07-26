import { getSeasonalAnime } from "@/lib/api/mal";
import { Anime } from "@/lib/types/anime";
import { useEffect, useState } from "react";

export function useSeasonalAnime(year: number, season: string) {
    const [anime, setAnime] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getSeasonalAnime(year, season)
            .then((data) => {
                if (data) setAnime(data.data)
            })
            .catch((err) => {
                console.error("Error getting seasonal anime: ", err);
                setError("Error getting seasonal anime");
                setAnime([]);
            })
            .finally(() => setLoading(false))
    }, [year, season]);

    return { anime, loading, error };
}
