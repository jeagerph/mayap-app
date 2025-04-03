export default [
    {
        path: '/company/accounts',

        name: 'Company Accounts',

        component: () => import('@/views/my-company/accounts'),

        meta:
        {
            name: 'User Accounts'
        }
    },
];