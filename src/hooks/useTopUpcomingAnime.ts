import { getTopUpcomingAnime } from "@/lib/api/mal";
import { Anime } from "@/lib/types/anime";
import { useEffect, useState } from "react";

export function useTopUpcomingAnime() {
    const [topUpcomingAnime, setTopUpcomingAnime] = useState<Anime[]>([]);
    const [loadingTopUpcoming, setTopUpcoming] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTopUpcomingAnime()
            .then((data) => {
                if (data) setTopUpcomingAnime(data.data)
            })
            .catch((err) => {
                console.error("Error getting top upcoming anime: ", err);
                setError("Error getting top upcoming anime");
                setTopUpcomingAnime([]);
            })
            .finally(() => setTopUpcoming(false))
    }, [])
    return {
        topUpcomingAnime, loadingTopUpcoming, error
    }
}