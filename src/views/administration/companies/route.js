export default [
    {
        path: '/administration/companies',
        name: 'Administration / Company',
        component: () => import('@/views/administration/companies'),
        meta:
        {
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Create Company',
                component: () => import('@/views/administration/companies'),
                meta:
                {
                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':code',
                name: 'View Company',
                component: () => import('@/views/administration/companies'),
                meta:
                {
                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: 'Edit Company',
                        component: () => import('@/views/administration/companies'),
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