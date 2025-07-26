"use client";

import { useEffect, useState } from "react";
import { AnimeListStatusType } from "@/lib/types/AnimeListStatusType";
import { getUserAnimeList } from "@/lib/auth/mal";
import { AnimeListStatus } from "@/lib/types/AnimeListStatus";

export const useUserAnimeList = (status: AnimeListStatusType) => {
    const [userAnimeList, setUserAnimeList] = useState<AnimeListStatus[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUserAnimeList(status)
            .then((data) => {
                if (data) setUserAnimeList(data.data);
            })
            .catch((err) => {
                console.error("Error getting user anime list: ", err);
                setError("Error getting anime list");
                setUserAnimeList([]);
            })
            .finally(() => setLoading(false))
    }, [status]);

    return { userAnimeList, loading, error };

}