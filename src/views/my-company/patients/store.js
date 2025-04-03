import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const companyPatient = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/patients',

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
