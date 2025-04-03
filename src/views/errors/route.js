export default [
    {
        path: '/suspended',
        name: 'Suspended Account',
        component: () => import('@/views/errors/suspended'),
        meta:
        {
            name: 'Account Suspended'
        }
    },
];