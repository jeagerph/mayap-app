import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanyQuestionnaire = {

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
