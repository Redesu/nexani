"use server";
import { cache } from "./cache";
import axios from "axios";

const CLIENT_ID = process.env.MAL_CLIENT_ID;

const malApi = axios.create({
    baseURL: 'https://api.myanimelist.net/v2',
    headers: {
        "X-MAL-CLIENT-ID": CLIENT_ID
    }
});

export async function getSeasonalAnime(year: number, season: string) {
    const cacheKey = `seasonal-anime-${year}-${season}`;
    const cacheData = cache.get(cacheKey);
    const cacheTtl = 60 * 60 * 1000; // 1 hour

    if (cacheData) {
        console.log("Using cache for seasonal anime...");
        return cacheData;
    }
    try {
        console.log("No cache found for seasonal anime, fetching from API...");
        const res = await malApi.get(`/anime/season/${year}/${season}`);
        cache.set(cacheKey, res.data, cacheTtl);
        return res.data;
    } catch (err) {
        console.error("Error fetching seasonal anime:", err);
        throw err;
    }
}

export async function getAnimeRanking() {
    const cacheKey = `anime-ranking`;
    const cacheData = cache.get(cacheKey);
    const cacheTtl = 60 * 60 * 1000; // 1 hour
    if (cacheData) {
        console.log("Using cache for anime ranking...");
        return cacheData;

    }

    try {
        console.log("No cache found for anime ranking, fetching from API...");
        const res = await malApi.get(`/anime/ranking?ranking_type=all`);
        cache.set(cacheKey, res.data, cacheTtl);
        return res.data;
    } catch (err) {
        console.error("Error fetching top anime:", err);
        throw err;
    }
}

export async function searchAnime(query: string) {
    try {
        const res = await malApi.get(`/anime?q=${query}&fields=id,title,main_picture`);
        return res.data;
    } catch (err) {
        console.error("Error searching anime:", err);
    }
}


export async function getTopUpcomingAnime() {
    const cacheKey = `top-upcoming-anime`;
    const cacheTtl = 60 * 60 * 1000; // 1 hour
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
        console.log("Using cache for top upcoming anime...");
        return cacheData;

    }

    try {
        console.log("No cache found for top upcoming anime, fetching from API...");
        const res = await malApi.get(`/anime/ranking?ranking_type=upcoming&limit=20`);
        cache.set(cacheKey, res.data, cacheTtl);
        return res.data;
    } catch (err) {
        console.error("Error fetching top upcoming anime:", err);
        throw err;
    }
}

export async function getAnimeDetails(id: number) {

    try {
        const res = await malApi.get(`/anime/${id}?fields=id,title,alternative_titles,main_picture,start_date,end_date,status,num_episodes,synopsis,mean,genres`);
        return res.data;
    } catch (err) {
        console.error("Error fetching top upcoming anime:", err);
        throw err;
    }
}