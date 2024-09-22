import axios from "axios";

const clientId: string = "1d1e246f57d74196bd8c7b4d6a850993";
const clientSecret: string = "670cb87379e84a0894c5c559d4ccf4bf";
const redirectUri: string =
  process.env.NODE_ENV === "production"
    ? "https://mylollagenerator.vercel.app/generated"
    : "http://localhost:8080/generated";
const scopes: string = "user-read-private user-read-email user-top-read";

const authEndpoint: string = "https://accounts.spotify.com/authorize";
const tokenEndpoint: string = "https://accounts.spotify.com/api/token";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const getLoginUrl = (): string => {
  const url = new URL(authEndpoint);
  var state = generateRandomString(16);
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("state", state);
  url.searchParams.append("scope", scopes);
  return url.toString();
};

function generateRandomString(length: number): string {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const getAccessToken = async (code: string): Promise<string> => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  console.log("code", code);
  params.append("redirect_uri", redirectUri);

  const headers = {
    Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(tokenEndpoint, params, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error("Erro ao obter o token de acesso", error);
    throw error;
  }
};
