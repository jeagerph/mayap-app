export default [
    {
        path: '/company/voters',
        name: 'Company / Voters',
        component: () => import('@/views/my-company/voters'),
        meta:
        {
            name: `Voters`,

            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: `Create Voter`,
                component: () => import('@/views/my-company/voters'),
                meta:
                {
                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':code',
                name: `View Voter`,
                component: () => import('@/views/my-company/voters'),
                meta:
                {
                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: `Edit Voter`,
                        component: () => import('@/views/my-company/voters'),
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