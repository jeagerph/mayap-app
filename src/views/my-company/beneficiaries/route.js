export default [
    {
        path: '/company/beneficiaries',
        name: 'Company / Beneficiaries',
        component: () => import('@/views/my-company/beneficiaries'),
        meta:
        {
            name: `${process.env.APP_BENEFICIARY_PLURAL_NAME}`,

            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: `Create ${process.env.APP_BENEFICIARY_SINGULAR_NAME}`,
                component: () => import('@/views/my-company/beneficiaries'),
                meta:
                {
                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: 'map',
                name: `${process.env.APP_BENEFICIARY_SINGULAR_NAME} Mapping`,
                component: () => import('@/views/my-company/beneficiaries'),
                meta:
                {
                    page: 'map',
                    subPage: 'main',
                },
            },
            {
                path: ':code',
                name: `View ${process.env.APP_BENEFICIARY_SINGULAR_NAME}`,
                component: () => import('@/views/my-company/beneficiaries'),
                meta:
                {
                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: `Edit ${process.env.APP_BENEFICIARY_SINGULAR_NAME}`,
                        component: () => import('@/views/my-company/beneficiaries'),
                        meta:
                        {
                            page: 'edit',
                            subPage: 'main',
                        },
                    },
                    {
                        path: 'network',
                        name: `View ${process.env.APP_BENEFICIARY_SINGULAR_NAME} Network`,
                        component: () => import('@/views/my-company/beneficiaries'),
                        meta:
                        {
                            page: 'network',
                        },
                    },
                    {
                        path: 'document/create',
                        name: `Create ${process.env.APP_BENEFICIARY_SINGULAR_NAME} Document`,
                        component: () => import('@/views/my-company/beneficiaries'),
                        meta:
                        {
                            name: 'Create Document',
                            
                            page: 'create',
                            subPage: 'document',
                        },
                    },
                ],
            },
        ],
    },
];