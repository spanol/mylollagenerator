import { spotifyApi, getAccessToken, getLoginUrl } from '@/services/api';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex'
export const key: InjectionKey<Store<any>> = Symbol();

interface StoreModel{
  accessToken: string;

}

const state: StoreModel = {
  accessToken: '',
};

const mutations = {
  SET_ACCESS_TOKEN(state: any, accessToken: string) { // Adicionado para definir o token de acesso no estado
    state.accessToken = accessToken;
  },
};

const actions = {
  async loginWithSpotify({ commit }: any) {
    try {
      const url = getLoginUrl();
      window.location.href = url;
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const accessToken = await getAccessToken(code);
        commit('SET_ACCESS_TOKEN', accessToken);
      }
    } catch (error) {
      console.error('Erro ao logar com Spotify', error);
    }
  },
  async getAccessToken({ commit }: any, code: string) {
    try {
      const accessToken = await getAccessToken(code);
      commit('SET_ACCESS_TOKEN', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Erro ao obter o token de acesso', error);
      throw error;
    }
  },
  async getTopArtists({ state }: any) {
    try {
      const response = await spotifyApi.get('/me/top/artists', {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      return response.data.items; 
    } catch (error) {
      console.error('Erro ao obter os artistas mais curtidos', error);
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
