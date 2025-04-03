import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const adminCompany = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/administration/companies',

        positions: [],
        positionsLoading: false,

        invoiceSetting: {},
        invoiceSettingLoading: false,

        smsSetting: {},
        smsSettingLoading: false,

        callSetting: {},
        callSettingLoading: false,

        networkSetting: {},
        networkSettingLoading: false,

        idSetting: {},
        idSettingLoading: false,

        mapSetting: {},
        mapSettingLoading: false,

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

        positions: state => state.positions,

        invoiceSetting: state => state.invoiceSetting,

        smsSetting: state => state.smsSetting,

        callSetting: state => state.callSetting,

        networkSetting: state => state.networkSetting,

        idSetting: state => state.idSetting,

        mapSetting: state => state.mapSetting,

        provinces: state => state.provinces,
        
        cities: state => state.cities,

        barangays: state => state.barangays,
    },
};
