import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const adminBarangayOfficial = {

    namespaced: true,

    state:
    {
        ...baseStates,
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
        ...baseGetters
    },
};
