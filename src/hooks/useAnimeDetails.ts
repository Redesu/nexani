import { useState, useEffect } from "react";
import { getAnimeDetails } from '@/lib/api/mal';
import { AnimeDetails } from "@/lib/types/animeDetails";

export function useAnimeDetails(id: number) {
    const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Trying to search anime with the id: " , id);
        getAnimeDetails(id)
            .then((data) => {
                 console.log("Data: ", data)
                if (data) setAnimeDetails(data);
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