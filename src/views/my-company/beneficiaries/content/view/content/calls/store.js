import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const companyBeneficiaryCall = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/beneficiary/calls',
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
