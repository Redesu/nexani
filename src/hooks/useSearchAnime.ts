import { useState, useEffect } from "react";
import { searchAnime } from "@/lib/api/mal";
import { Anime } from '@/lib/types/anime';

export function useSearchAnime(query: string, delay: number = 700) {
    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {

            if (!query.trim()) return

            if (query.trim().length < 3) return

            if (query.trim()) {
                setLoading(true);
                setError(null);
                searchAnime(query)
                    .then((data) => {
                        if (data) setSearchResults(data.data);
                    })
                    .catch((err) => {
                        console.error("Error searching anime: ", err);
                        setError("Error searching anime");
                        setSearchResults([]);
                    })
                    .finally(() => setLoading(false));
            } else {
                setSearchResults([]);
                setLoading(false);
            }
        }, delay);
        return () => clearTimeout(handler);
    }, [query, delay]);

    return { searchResults, loading, error };
}