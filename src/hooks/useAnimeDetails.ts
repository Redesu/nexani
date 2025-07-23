import { useState, useEffect } from "react";
import { getAnimeDetails } from '@/lib/api/mal';
import { AnimeDetails } from "@/lib/types/animeDetails";

export function useAnimeDetails(id: number | null) {
    const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{
        message: string;
        status?: number;
    } | null>(null);

    useEffect(() => {
        if (id === null || isNaN(id)) {
            setLoading(false);
            setError({ message: "Invalid anime ID" })
            return;
        }
        setLoading(true);
        getAnimeDetails(id)
            .then((data) => {
                if (data) {
                    setAnimeDetails(data);
                } else {
                    setError({ message: "Anime not found" });
                }
            })
            .catch((err) => {

                const status = err.response?.status || 500;
                const message = err.response?.data?.message || "Unknown error";
                setError({ message, status });
                setAnimeDetails(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { animeDetails, loading, error };
}