import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

import Http from '@/services';

export const adminAccount = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/administration/accounts',

        types: [],
        typesLoading: false,
        typeLoading: false,

        modules: [],
        modulesLoading: false,
        moduleLoading: false,
    },

    mutations:
    {
        ...baseMutations,

        setPrerequisite: (state, module) =>
        {
            state[module.state] = module.items;
        },

        appendPrerequisite: (state, module) =>
        {
            state[module.state].push(module.item);
        },
    },

    actions:
    {
        ...baseActions,

        loadPrerequisite: async ({ commit }, module) =>
        {
            commit('setLoading', { action: module.action, boolean: true });
    
            const response = await Http.get(module.url);
    
            commit('setLoading', { action: module.action, boolean: false });

            if (response.status === 200) commit('setPrerequisite', { state: module.action, items: response.data.data });
    
            return response;
        },

        storePrerequisite: async ({ commit }, module) =>
        {
            commit('setLoading', { action: module.loading, boolean: true });
    
            const response = await Http.post(module.url, module.form);
    
            commit('setLoading', { action: module.loading, boolean: false });

            if (response.status === 201) commit('appendPrerequisite', { state: module.state, item: response.data });
    
            return response;
        },
    },

    getters:
    {
        ...baseGetters,

        types: state => state.types,

        modules: state => state.modules,
    },
};
