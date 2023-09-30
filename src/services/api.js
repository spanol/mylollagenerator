import axios from 'axios';

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = 'user-read-private user-read-email'; 

const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const getLoginUrl = () => {
  const url = `${authEndpoint}?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return url;
};

const getAccessToken = async (code) => {
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

export { spotifyApi, getLoginUrl, getAccessToken };