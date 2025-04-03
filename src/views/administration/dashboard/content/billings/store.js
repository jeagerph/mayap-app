import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

import Http from '@/services';

export const adminDashboardBilling = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/administration/dashboard/billings/unpaid/with-payment-attachments',
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
