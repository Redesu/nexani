import { useState, useEffect } from "react";
import { getAnimeDetails } from '@/lib/api/mal';
import { AnimeDetails } from "@/lib/types/animeDetails";

export function useSearchAnime(id: number) {
    const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAnimeDetails(id)
            .then((data) => {
                if (data) setAnimeDetails(data.data);
            })
            .catch((err) => {
                console.error("Error searching anime: ", err);
                setError("Error searching anime");
                setAnimeDetails(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { animeDetails, loading, error };
}