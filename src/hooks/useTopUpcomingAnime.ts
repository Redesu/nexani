import { getTopUpcomingAnime } from "@/lib/api/mal";
import { Anime } from "@/lib/types/anime";
import { useEffect, useState } from "react";

export function useTopUpcomingAnime() {
    const [topUpcomingAnime, setTopUpcomingAnime] = useState<Anime[]>([]);
    const [loadingTopUpcoming, setTopUpcoming] = useState(true);

    useEffect(() => {
        getTopUpcomingAnime()
            .then((data) => {
                if (data) setTopUpcomingAnime(data.data)
            })
            .catch(console.error)
            .finally(() => setTopUpcoming(false))
    }, [])
    return {
        topUpcomingAnime, loadingTopUpcoming
    }
}