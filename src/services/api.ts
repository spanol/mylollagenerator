import axios from "axios";

const clientId: string = "1d1e246f57d74196bd8c7b4d6a850993";
const clientSecret: string = "670cb87379e84a0894c5c559d4ccf4bf";
const redirectUri: string = "http://localhost:8080/generated";
// const redirectUri: string = "https://mylollagenerator.vercel.app/generated";
const scopes: string = "user-read-private user-read-email user-top-read";

const authEndpoint: string = "https://accounts.spotify.com/authorize";
const tokenEndpoint: string = "https://accounts.spotify.com/api/token";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

function generateCodeVerifier(length = 128) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codeVerifier = "";
  for (let i = 0; i < length; i++) {
    codeVerifier += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return codeVerifier;
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const getLoginUrl = async (): Promise<string> => {
  const codeVerifier = generateCodeVerifier();
  localStorage.setItem("code_verifier", codeVerifier);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const url = `${authEndpoint}?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  return url;
};

export const getAccessToken = async (code: string): Promise<string> => {
  const codeVerifier = localStorage.getItem("code_verifier");
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", codeVerifier || "");

  try {
    const response = await axios.post(tokenEndpoint, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Erro ao obter o token de acesso", error);
    throw error;
  }
};
