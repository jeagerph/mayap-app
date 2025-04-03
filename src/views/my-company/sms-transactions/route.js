export default [
    {
        path: '/company/sms-transactions',
        name: 'Company SMS Transactions',
        component: () => import('@/views/my-company/sms-transactions'),
        meta:
        {
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Create SMS Transaction',
                component: () => import('@/views/my-company/sms-transactions'),
                meta:
                {
                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':code',
                name: 'View SMS Transaction',
                component: () => import('@/views/my-company/sms-transactions'),
                meta:
                {
                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: 'Edit SMS Transaction',
                        component: () => import('@/views/my-company/sms-transactions'),
                        meta:
                        {
                            page: 'edit',
                            subPage: 'main',
                        },
                    },
                ],
            },
        ],
    },
];