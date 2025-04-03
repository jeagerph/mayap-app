export default [
    {
        path: '/company/dashboard',

        name: 'Company / Dashboard',

        component: () => import('@/views/my-company/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];