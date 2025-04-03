import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const companyResident = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/monitoring/residents'
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
