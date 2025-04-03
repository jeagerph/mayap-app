import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const adminCompanyAccount = {

    namespaced: true,

    state:
    {
        ...baseStates,

        modules: [],
        modulesLoading: false,
    },

    mutations:
    {
        ...baseMutations,
    },

    actions:
    {
        ...baseActions,
    },

    getters:
    {
        ...baseGetters,

        modules: state => state.modules,
    },
};
