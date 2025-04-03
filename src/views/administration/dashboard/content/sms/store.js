import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

import Http from '@/services';

export const adminDashboardSms = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/administration/dashboard/sms-credits/pending',
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
