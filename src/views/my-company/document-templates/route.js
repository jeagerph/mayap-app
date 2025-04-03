export default [
    {
        path: '/company/document-templates',
        name: 'Company / Document Templates',
        component: () => import('@/views/my-company/document-templates'),
        meta:
        {
            name: 'Document Templates',
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Company / Create Document Template',
                component: () => import('@/views/my-company/document-templates'),
                meta:
                {
                    name: 'Create Document Template',

                    page: 'create',
                    subPage: 'main',
                },
            },
            {
                path: ':id',
                name: 'Company / View Document Template',
                component: () => import('@/views/my-company/document-templates'),
                meta:
                {
                    name: 'View Document Template',

                    page: 'view',
                },
                children:
                [
                    {
                        path: 'edit',
                        name: 'Company / Edit Document Template',
                        component: () => import('@/views/my-company/document-templates'),
                        meta:
                        {
                            name: 'Edit Document Template',

                            page: 'edit',
                            subPage: 'main',
                        },
                    },
                ],
            },
        ],
    },
];