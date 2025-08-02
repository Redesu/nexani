import { useState, useEffect } from "react";
import { getAnimeDetails } from '@/lib/api/mal';
import { AnimeDetails } from "@/lib/types/animeDetails";

export function useAnimeDetails(id: number | null) {
    const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === null || isNaN(id)) {
            setLoading(false);
            setError("Invalid anime ID")
            return;
        }
        setLoading(true);
        getAnimeDetails(id)
            .then((data) => {
                if (data) {
                    setAnimeDetails(data);
                } else {
                    setError("Anime not found");
                }
            })
            .catch((err) => {
                console.error("Error getting anime details: ", err);
                setError("Error getting anime details");
                setAnimeDetails(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { animeDetails, loading, error };
}