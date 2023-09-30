import axios from 'axios';

const clientId: string = '1d1e246f57d74196bd8c7b4d6a850993';
const clientSecret: string = '670cb87379e84a0894c5c559d4ccf4bf';
const redirectUri: string = 'http://localhost:8080/generated';
const scopes: string = 'user-read-private user-read-email';

const authEndpoint: string = 'https://accounts.spotify.com/authorize';
const tokenEndpoint: string = 'https://accounts.spotify.com/api/token';

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export const getLoginUrl = (): string => {
  const url = `${authEndpoint}?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return url;
};

export const getAccessToken = async (code: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);

  const headers = {
    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(tokenEndpoint, params, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter o token de acesso', error);
    throw error;
  }
};