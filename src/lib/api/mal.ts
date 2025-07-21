"use server";
import { cache } from "./cache";
import axios from "axios";

const MAL_API_URL = "https://api.myanimelist.net/v2";
const CLIENT_ID = process.env.MAL_CLIENT_ID;

export async function getSeasonalAnime(year: number, season: string) {
    const cacheKey = `seasonal-anime-${year}-${season}`;
    const cacheData = cache.get(cacheKey);

    if (cacheData) {
        console.log("Using cache for seasonal anime...");
        return cacheData;
    }
    try {
        console.log("No cache found for seasonal anime, fetching from API...");
        const res = await axios.get(`${MAL_API_URL}/anime/season/${year}/${season}`, {
            headers: {
                "X-MAL-CLIENT-ID": CLIENT_ID
            }
        });
        cache.set(cacheKey, res.data);
        return res.data;
    } catch (err) {
        console.error("Error fetching seasonal anime:", err);
        throw err;
    }
}

export async function getAnimeRanking() {
    const cacheKey = `anime-ranking`;
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
        console.log("Using cache for anime ranking...");
        return cacheData;

    }

    try {
        console.log("No cache found for anime ranking, fetching from API...");
        const res = await axios.get(`${MAL_API_URL}/anime/ranking?ranking_type=all`, {
            headers: {
                "X-MAL-CLIENT-ID": CLIENT_ID
            }
        });
        cache.set(cacheKey, res.data);
        return res.data;
    } catch (err) {
        console.error("Error fetching top anime:", err);
        throw err;
    }
}

export async function searchAnime(query: string) {
    try {
        const res = await axios.get(`${MAL_API_URL}/anime?q=${query}&fields=id,title,main_picture`, {
            headers: {
                "X-MAL-CLIENT-ID": CLIENT_ID
            }
        });
        console.log("Search results: ", res.data);
        return res.data;
    } catch (err) {
        console.error("Error searching anime:", err);
    }
}


export async function getTopUpcomingAnime() {
    const cacheKey = `top-upcoming-anime`;
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
        console.log("Using cache for top upcoming anime...");
        return cacheData;

    }

    try {
        console.log("No cache found for top upcoming anime, fetching from API...");
        const res = await axios.get(`${MAL_API_URL}/anime/ranking?ranking_type=upcoming&limit=20`, {
            headers: {
                "X-MAL-CLIENT-ID": CLIENT_ID
            }
        });
        cache.set(cacheKey, res.data);
        return res.data;
    } catch (err) {
        console.error("Error fetching top upcoming anime:", err);
        throw err;
    }
}