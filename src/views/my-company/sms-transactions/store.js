import { baseStates, baseMutations, baseActions, baseGetters } from '@/stores/base';

export const myCompanySmsTransaction = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/sms-transactions',

        smsTransaction: {},
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
