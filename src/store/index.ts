import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex'
export const key: InjectionKey<Store<any>> = Symbol();

const state: any = {

};

const mutations = {

};

const actions = {

};

const getters = {

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
