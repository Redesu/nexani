"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "../api/cache";


const MAL_API_URL = "https://api.myanimelist.net/v2";


export async function getUserDetails() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('access_token')?.value;
    const cacheKey = `user-details`;
    const cacheData = cache.get(cacheKey);
    const cacheTtl = 5 * 60 * 1000; // 5 minutes

    if (!accessToken) {
        return { error: "No access token found" }
    }

    if (cacheData) {
        console.log("Using cache for user details...");
        return cacheData;
    }

    try {
        console.log("Fetching user details...");

        const res = await axios.get(`${MAL_API_URL}/users/@me`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        cache.set(cacheKey, res.data, cacheTtl);
        return res.data;
    } catch (err) {
        console.error("Error fetching user details:", err);
        throw err;
    }

}