import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

import Http from '@/services';

// 1: GRANDFATHER/GRANDMOTHER
// 2: FATHER/MOTHER
// 3: UNCLE/AUNT
// 4: 

export const companyBeneficiaryNetwork = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/beneficiary/networks',

        networks: [],
        networksLoading: false,

        provinces: [],
        provincesLoading: false,

        cities: [],
        citiesLoading: false,

        barangays: [],
        barangaysLoading: false,
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

        networks: state => state.networks,

        provinces: state => state.provinces,

        cities: state => state.cities,

        barangays: state => state.barangays,
    },
};
