import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    cookieStore.delete('oauth_state');
    cookieStore.delete('code_verifier');

    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get('redirect');

    if (redirect) {
        return NextResponse.redirect(new URL(redirect, request.url));
    } else {
        return NextResponse.redirect(new URL('/', request.url));
    }
}