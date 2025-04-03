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

export const companyBeneficiaryRelative = {

    namespaced: true,

    state:
    {
        ...baseStates,

        url: '/company/beneficiary/relatives',

        // items: [
        //     {
        //         relationship: 'FATHER',
        //         relative:
        //         {
        //             first_name: 'JUAN',
        //             middle_name: '',
        //             last_name: 'DELA CRUZ',
        //             date_of_birth: '1970-01-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'OLONGAPO CITY'
        //             },
        //             barangay:
        //             {
        //                 name: 'OLD CABALAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'MALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'FATHER'
        //             },
        //         }
                
        //     },
        //     {
        //         relationship: 'MOTHER',

        //         relative:
        //         {
        //             first_name: 'MARIA',
        //             middle_name: '',
        //             last_name: 'DELA CRUZ',
        //             date_of_birth: '1972-04-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'OLONGAPO CITY'
        //             },
        //             barangay:
        //             {
        //                 name: 'OLD CABALAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'FEMALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'MOTHER'
        //             },
        //         }
                
        //     },
        //     {
        //         relationship: 'SIBLING',

        //         relative:
        //         {
        //             first_name: 'PEDRO',
        //             middle_name: '',
        //             last_name: 'DELA CRUZ',
        //             date_of_birth: '1994-06-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'OLONGAPO CITY'
        //             },
        //             barangay:
        //             {
        //                 name: 'OLD CABALAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'MALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'SIBLING'
        //             },
        //         }
                
        //     },
        //     {
        //         relationship: 'SIBLING',

        //         relative:
        //         {
        //             first_name: 'SANTA',
        //             middle_name: '',
        //             last_name: 'DELA CRUZ',
        //             date_of_birth: '1998-06-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'OLONGAPO CITY'
        //             },
        //             barangay:
        //             {
        //                 name: 'OLD CABALAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'FEMALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'SIBLING'
        //             },
        //         }
                
        //     },
        //     {
        //         relationship: 'SIBLING',

        //         relative:
        //         {
        //             first_name: 'BALTAZAR',
        //             middle_name: '',
        //             last_name: 'DELA CRUZ',
        //             date_of_birth: '2000-09-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'OLONGAPO CITY'
        //             },
        //             barangay:
        //             {
        //                 name: 'OLD CABALAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'MALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'SIBLING'
        //             },
        //         }
                
        //     },
        //     {
        //         relationship: 'AUNT',

        //         relative:
        //         {
        //             first_name: 'SUSAN',
        //             middle_name: 'DELA CRUZ',
        //             last_name: 'SANTIAGO',
        //             date_of_birth: '1974-10-01',
        //             province:
        //             {
        //                 name: 'ZAMBALES'
        //             },
        //             city:
        //             {
        //                 name: 'SUBIC'
        //             },
        //             barangay:
        //             {
        //                 name: 'CALAPACUAN'
        //             },
        //             gender:
        //             {
        //                 id: 1,
        //                 name: 'FEMALE'
        //             },
        //             photo: '',
        //             relationship:
        //             {
        //                 id: 1,
        //                 name: 'AUNT'
        //             },
        //         }
                
        //     },
        // ],
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
