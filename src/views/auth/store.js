import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

import Http from "@/services";
import { Token, Cookie, Storage } from "@/utils";

const defaultAccessUser = {
  full_name: "Default User",
  photo: "",
  account_type: {
    id: 1,
    name: "Administrator",
  },
  user: {
    username: "def001",
    code: "AAAA",
    locked: 0,
  },
};

export const auth = {
  namespaced: true,

  state: {
    accessToken: null,
    refreshToken: null,
    accessUser: {
      ...defaultAccessUser,
    },
    isActive: false,

    signinLoading: false,
    signoutLoading: false,
    processLoading: false,
    updateLoading: false,
    userLoading: false,

    showSidebar: false,
  },

  mutations: {
    setTokens: (state, { accessToken, refreshToken }) => {
      state.isActive = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },

    setUser: (state, data) => {
      state.accessUser = data;

      state.showSidebar = true;
    },

    setLoading: (state, { action, boolean }) => {
      state[`${action}Loading`] = boolean;
    },

    resetState: (state) => {
      state.isActive = false;
      (state.accessUser = {
        ...defaultAccessUser,
      }),
        (state.accessToken = null);
      state.refreshToken = null;
      state.showSidebar = false;
    },
  },

  actions: {
    update: async ({ commit }, { url, form }) => {
      commit("setLoading", { action: "update", boolean: true });

      const response = await Http.put(url, form);

      commit("setLoading", { action: "update", boolean: false });

      if (response.status === 200) {
        commit("setUser", response.data);
      }

      return response;
    },

    updatePassword: async ({ commit }, { url, form }) => {
      commit("setLoading", { action: "update", boolean: true });

      const response = await Http.put(url, form);

      commit("setLoading", { action: "update", boolean: false });

      return response;
    },

    signin: async ({ commit, dispatch }, { form }) => {
      commit("setLoading", { action: "signin", boolean: true });

      const response = await Http.post(`/login`, form);

      commit("setLoading", { action: "signin", boolean: false });

      if (response.status === 200) {
        Token.set(response.data);

        dispatch("loadUser");
      }

      return response;
    },

    signout: async ({ commit }) => {
      commit("setLoading", { action: "signout", boolean: true });

      const response = await Http.get("/logout");

      commit("setLoading", { action: "signout", boolean: false });

      if (response.status === 200) {
        // commit('resetState');

        Token.destroy();

        Storage.destroy("mmbrshp_loading_screen");
      }

      return response;
    },

    loadUser: async ({ commit }) => {
      commit("setLoading", { action: "user", boolean: true });

      const response = await Http.get("/my-account");

      if (response.status === 200) {
        commit("setTokens", {
          accessToken: Cookie.get(process.env.APP_ACCESS_TOKEN),
          refreshToken: Cookie.get(process.env.APP_REFRESH_TOKEN),
        });

        commit("setUser", response.data);

        if (response.data.account_type.id == 2) {
          if (!Storage.get("mmbrshp_loading_screen")) {
            Storage.set("mmbrshp_loading_screen", response.data.company.logo);
          }

          document.title = `Dashboard | ${response.data.company.name}`;

          Vue.use(VueGoogleMaps, {
            load: {
              key: response.data.company.map_setting.api_key,
              libraries: "places",
            },
          });
        }
      }

      commit("setLoading", { action: "user", boolean: false });

      return response;
    },

    forceSignout: ({ commit }) => {
      Token.destroy();

      commit("resetState");
    },

    updateUser: async ({ commit }, user) => {
      commit("setUser", user);
    },

    unset: ({ commit }) => {
      commit("resetState");
    },
  },

  getters: {
    accessUser: (state) => state.accessUser,

    isActive: (state) => state.isActive,

    isLoading: (state) => (action) => state[`${action}Loading`],

    showSidebar: (state) => state.showSidebar,
  },
};
