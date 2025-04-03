export default [
    {
        path: '/company/id-templates',
        name: 'Company / ID Templates',
        component: () => import('@/views/my-company/id-templates'),
        meta:
        {
            name: 'ID Templates',
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Company / Create ID Template',
                component: () => import('@/views/my-company/id-templates'),
                meta:
                {
                    name: 'Create ID Template',

                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':id',
                name: 'Company / View ID Template',
                component: () => import('@/views/my-company/id-templates'),
                meta:
                {
                    name: 'View ID Template',

                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: 'Company / Edit ID Template',
                        component: () => import('@/views/my-company/id-templates'),
                        meta:
                        {
                            name: 'Edit ID Template',

                            page: 'edit',
                            subPage: 'main',
                        },
                    },
                ],
            },
        ],
    },
];