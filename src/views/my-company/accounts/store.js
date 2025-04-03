import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanyAccount = {

    namespaced: true,

    state:
    {
        ...baseStates,

        modules: [],
        modulesLoading: false,
        moduleLoading: false,

        positions: [],
        positionsLoading: false,
        positionLoading: false,
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

        positions: state => state.positions,
    },
};
