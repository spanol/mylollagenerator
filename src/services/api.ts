import axios from "axios";

const clientId: string =
  process.env.VUE_APP_SPOTIFY_CLIENT_ID || "";
const clientSecret: string =
  process.env.VUE_APP_SPOTIFY_CLIENT_SECRET || "";
const redirectUri: string =
  process.env.VUE_APP_SPOTIFY_REDIRECT_URI ||
  (process.env.NODE_ENV === "production"
    ? "https://mylollagenerator.vercel.app/generated"
    : "http://localhost:8080/generated");
const scopes: string = "user-read-private user-read-email user-top-read";

const authEndpoint: string = "https://accounts.spotify.com/authorize";
const tokenEndpoint: string = "https://accounts.spotify.com/api/token";

const STATE_KEY = "spotify_auth_state";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const getLoginUrl = (): string => {
  const state = generateRandomString(16);
  sessionStorage.setItem(STATE_KEY, state);

  const url = new URL(authEndpoint);
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("state", state);
  url.searchParams.append("scope", scopes);
  return url.toString();
};

export const validateState = (state: string | null): boolean => {
  const storedState = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);
  return !!state && state === storedState;
};

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export const getAccessToken = async (
  code: string
): Promise<TokenResponse> => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);

  const headers = {
    Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(tokenEndpoint, params, { headers });
  return response.data as TokenResponse;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenResponse> => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const headers = {
    Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(tokenEndpoint, params, { headers });
  return response.data as TokenResponse;
};
