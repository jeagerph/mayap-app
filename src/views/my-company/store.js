import {
    baseStates,
    baseMutations,
    baseActions,
    baseGetters,
} from '@/stores/base';

export const myCompany = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company',

        profile: {},
        profileLoading: false,

        networkSetting: {},
        networkSettingLoading: false,
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

        profile: state => state.profile,

        networkSetting: state => state.networkSetting,
    },
};
