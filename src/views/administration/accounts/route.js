export default [
    {
        path: '/administration/accounts',
        name: 'Administration / User Accounts',
        component: () => import('@/views/administration/accounts'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Create User Account',
                component: () => import('@/views/administration/accounts'),
                meta:
                {
                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':code',
                name: 'View User Account',
                component: () => import('@/views/administration/accounts'),
                meta:
                {
                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: 'Edit User Account',
                        component: () => import('@/views/administration/accounts'),
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