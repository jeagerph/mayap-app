import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanyIdTemplate = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/my-company/id-templates',

        assignatories: [],
        assignatoriesLoading: false,
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

        assignatories: state => state.assignatories,
    },
};
