import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const cookieStore = await cookies();
    const storedState = cookieStore.get('oauth_state')?.value;
    const verifier = cookieStore.get('code_verifier')?.value;


    if (!code || !verifier) {
        return NextResponse.json(
            { error: 'Missing code or verifier' },
            { status: 400 }
        );
    }

    if (state !== storedState) {
        return NextResponse.json(
            { error: 'Invalid state parameter' },
            { status: 400 }
        );
    }

    try {
        const clientId = process.env.MAL_CLIENT_ID;
        const clientSecret = process.env.MAL_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error('Missing MAL_CLIENT_ID or MAL_CLIENT_SECRET envoriment variable');
        }

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`,
            code_verifier: verifier,
        });

        const response = await axios.post('https://myanimelist.net/v1/oauth2/token', body.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        const data = await response.data;

        if (!response.status || response.status !== 200) {
            console.error('Token exchange error:', data);
            return NextResponse.json(
                { error: 'Token exchange error' },
                { status: response.status }
            );
        }

        const { access_token, refresh_token, expires_in } = data;

        const oneDay = 24 * 60 * 60 * 1000;
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: Date.now() + (expires_in * 1000 - oneDay),
            path: '/',
            sameSite: 'lax'
        });

        cookieStore.set('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: Date.now() + thirtyDays,
            path: '/',
            sameSite: 'lax'
        });

        cookieStore.delete('oauth_state');
        cookieStore.delete('code_verifier');

        return NextResponse.redirect(new URL('/', request.url));
    } catch (err: any) {
        console.error('Full error details:', {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            message: err.message
        });
        return NextResponse.json(
            { error: err.message || 'Unknown error' },
            { status: 500 }
        );
    }
}