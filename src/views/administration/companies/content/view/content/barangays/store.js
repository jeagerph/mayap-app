import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const adminCompanyBarangay = {

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
        ...baseGetters,
    },
};
