export default [
    {
        path: '/administration/dashboard',

        name: 'Administration / Dashboard',

        component: () => import('@/views/administration/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];