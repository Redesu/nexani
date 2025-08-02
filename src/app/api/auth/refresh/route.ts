import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_request: Request) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
        return NextResponse.json(
            { error: "Refresh token not found" },
            { status: 400 }
        )
    }

    try {
        const response = await axios.post("https://api.myanimelist.net/v1/oauth2/token", new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.MAL_CLIENT_ID || '',
            client_secret: process.env.MAL_CLIENT_SECRET || '',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in } = response.data;
        cookieStore.set('access_token', newAccessToken);
        cookieStore.set('refresh_token', newRefreshToken);

        const newCookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: expires_in,
            path: '/',
        };

        cookieStore.set('access_token', newAccessToken, newCookieOptions);
        cookieStore.set('refresh_token', newRefreshToken, newCookieOptions);
        return NextResponse.json({ message: 'Refresh token refreshed successfully' });
    } catch (err) {
        console.error("Error refreshing token:", err);
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        return NextResponse.json(
            { error: "Failed to refresh token" },
            { status: 500 }
        );
    }
}