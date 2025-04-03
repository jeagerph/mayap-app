import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const companyBeneficiary = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/beneficiaries',

        provinces: [],
        provincesLoading: false,

        cities: [],
        citiesLoading: false,

        barangays: [],
        barangaysLoading: false,

        classifications: [],
        classificationsLoading: false,

        officerClassifications: [],
        officerClassificationsLoading: false,

        questionnaires: [],
        questionnairesLoading: false,

        idTemplates: [],
        idTemplatesLoading: false,

        documentTemplates: [],
        documentTemplatesLoading: false,
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

        classifications: state => state.classifications,

        officerClassifications: state => state.officerClassifications,

        questionnaires: state => state.questionnaires,

        idTemplates: state => state.idTemplates,

        documentTemplates: state => state.documentTemplates,
    },
};
