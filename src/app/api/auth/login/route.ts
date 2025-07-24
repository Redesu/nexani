import { generateState, getCodeChallenge } from "@/lib/auth/utils"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const state = generateState();
    const { verifier } = await getCodeChallenge();

    const cookieStore = await cookies();

    cookieStore.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 10,
        path: '/',
        sameSite: 'lax'
    });

    cookieStore.set('code_verifier', verifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 10,
        path: '/',
        sameSite: 'lax'
    });

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: `${process.env.MAL_CLIENT_ID}`,
        state: state,
        redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`,
        code_challenge: verifier,
        code_challenge_method: 'plain',
    }
    );

    const authUrl = `https://myanimelist.net/v1/oauth2/authorize?${params.toString()}`;

    return NextResponse.redirect(authUrl);
}