async function generateCodeVerifier() {
    //code-verifier = 43*128unreserved
    //unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
    //ALPHA = %x41-5A / %x61-7A
    //DIGIT = %x30-39

    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    let str = '';
    for (let i = 0; i < randomBytes.length; i++) {
        str += String.fromCharCode(randomBytes[i]);
    }

    const result = btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    return result;
}

async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export function generateState() {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes)
    let str = '';
    for (let i = 0; i < randomBytes.length; i++) {
        str += String.fromCharCode(randomBytes[i]);
    }

    const result = btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    return result.toString();
}

export async function getCodeChallenge() {
    // for now, the api only supports plain code verifier
    const verifier = await generateCodeVerifier();
    // When MAL starts supporting PKCE as a standard, uncomment this
    // const challenge = await generateCodeChallenge(verifier);
    return {
        verifier,
        // challenge
    };
}
