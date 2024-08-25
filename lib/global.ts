import fetch from 'node-fetch';

type GuestSessionApiResponse = {
    success: boolean;
    guest_session_id: string;
    expires_at: number;
};

export const CreateGuestSession = async (): Promise<GuestSessionApiResponse> => {
    const authorization = process.env.AUTHORIZATION;

    if (!authorization) {
        throw new Error('Authorization key is missing');
    }

    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: authorization,
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json: GuestSessionApiResponse = await response.json();
        console.log(json);
        return json;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error:', err.message);
        } else {
            console.error('Unknown error:', err);
        }
        throw err; 
    }
};

