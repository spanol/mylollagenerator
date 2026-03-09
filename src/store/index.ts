import {
  spotifyApi,
  getAccessToken as getAccessTokenApi,
  refreshAccessToken as refreshAccessTokenApi,
  getLoginUrl,
  TokenResponse,
} from "@/services/api";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from "vuex";

export const key: InjectionKey<Store<StoreModel>> = Symbol();

interface StoreModel {
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: number;
}

const state: StoreModel = {
  accessToken: "",
  refreshToken: "",
  tokenExpiresAt: 0,
};

const mutations = {
  SET_TOKEN_DATA(state: StoreModel, tokenData: TokenResponse) {
    state.accessToken = tokenData.access_token;
    state.refreshToken = tokenData.refresh_token;
    state.tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
  },
};

const actions = {
  async loginWithSpotify() {
    const url = getLoginUrl();
    window.location.href = url;
  },
  async getAccessToken(
    { commit }: { commit: Function },
    code: string
  ): Promise<string> {
    const tokenData = await getAccessTokenApi(code);
    commit("SET_TOKEN_DATA", tokenData);
    return tokenData.access_token;
  },
  async ensureValidToken({
    state,
    commit,
  }: {
    state: StoreModel;
    commit: Function;
  }): Promise<string> {
    if (state.accessToken && Date.now() < state.tokenExpiresAt - 60000) {
      return state.accessToken;
    }
    if (state.refreshToken) {
      const tokenData = await refreshAccessTokenApi(state.refreshToken);
      commit("SET_TOKEN_DATA", tokenData);
      return tokenData.access_token;
    }
    throw new Error("No valid token available");
  },
  async getTop<T>(
    { state, dispatch }: { state: StoreModel; dispatch: Function },
    target: string
  ): Promise<T[]> {
    const token = await dispatch("ensureValidToken");
    const response = await spotifyApi.get(`/me/top/${target}?limit=50`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items as T[];
  },
};

const getters = {
  accessToken: (state: StoreModel) => state.accessToken,
};

export const store = createStore<StoreModel>({
  state,
  mutations,
  actions,
  getters,
});

export function useStore() {
  return baseUseStore(key);
}
