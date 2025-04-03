import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanyDocumentTemplate = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/my-company/document-templates',

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
