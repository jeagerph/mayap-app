import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const companyVoter = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/voters',

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

        provinces: state => state.provinces,

        cities: state => state.cities,

        barangays: state => state.barangays,
    },
};
