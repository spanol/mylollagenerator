import {
  spotifyApi,
  getAccessToken as getAccessTokenApi,
  getLoginUrl,
} from "@/services/api";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from "vuex";

export const key: InjectionKey<Store<any>> = Symbol();

interface StoreModel {
  accessToken: string;
}

const state: StoreModel = {
  accessToken: "",
};

const mutations = {
  SET_ACCESS_TOKEN(state: any, accessToken: string) {
    state.accessToken = accessToken;
  },
};

const actions = {
  // async loginWithSpotify({ commit }: any) {
  //   try {
  //     const url = getLoginUrl();
  //     window.location.href = url;
  //     const code = new URL(window.location.href).searchParams.get("code");
  //     if (code) {
  //       const accessToken = await getAccessTokenApi(code);
  //       commit("SET_ACCESS_TOKEN", accessToken);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao logar com Spotify", error);
  //   }
  // },
  async loginWithSpotify() {
    const url = await getLoginUrl();
    window.location.href = url;
  },
  async handleRedirect({ commit }: any) {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      const accessToken = await getAccessTokenApi(code);
      commit("SET_ACCESS_TOKEN", accessToken);
    }
  },
  async getAccessToken({ commit }: any, code: string) {
    try {
      const accessToken = await getAccessTokenApi(code);
      commit("SET_ACCESS_TOKEN", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Erro ao obter o token de acesso", error);
      throw error;
    }
  },
  async getTop<T>(
    { state }: any,
    target: string,
    limit: number = 50
  ): Promise<T[]> {
    try {
      const response = await spotifyApi.get(
        `/me/top/${target}?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );
      return response.data.items as T[];
    } catch (error) {
      console.error(`Erro ao obter os ${target} mais curtidos`, error);
      throw error;
    }
  },
  async getTopGenres({ state }: any) {
    try {
      const response = await spotifyApi.get("/me/top/artists", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error("Erro ao obter os artistas mais curtidos", error);
      throw error;
    }
  },
};

const getters = {
  accessToken: (state: any) => state.accessToken,
};

const modules = {};

export const store = createStore<any>({
  state,
  mutations,
  actions,
  getters,
  modules,
});

export function useStore() {
  return baseUseStore(key);
}
