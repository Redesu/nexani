"use server";

import axios from "axios";
import { cookies } from "next/headers";


const MAL_API_URL = "https://api.myanimelist.net/v2";


export async function getUserDetails() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('access_token')?.value;

    if (!accessToken) {
        return { error: "No access token found" }
    }

    try {
        console.log("Fetching user details...");

        const res = await axios.get(`${MAL_API_URL}/users/@me`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching user details:", err);
        throw err;
    }

}