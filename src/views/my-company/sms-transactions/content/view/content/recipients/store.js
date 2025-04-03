import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanySmsTransactionRecipient = {

    namespaced: true,

    state:
    {
        ...baseStates,

        activeFilter: 'all',
    },

    mutations:
    {
        ...baseMutations,

        setActiveFilter: (state, filter) => {

            state.activeFilter = filter;
        },
    },

    actions:
    {
        ...baseActions,

        onSetFilter: async ({ commit }, filter = 'all') =>
        {
            commit('setActiveFilter', filter);
        },
    },

    getters:
    {
        ...baseGetters,

        activeFilter: state => state.activeFilter,
    },
};
