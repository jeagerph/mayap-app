export default [
    {
        path: '/company/monitoring/barangays',
        name: 'Company Monitoring / Baangay',
        component: () => import('@/views/my-company/monitoring/barangays'),
        meta:
        {
            name: 'Monitoring',

            page: 'list',
        },
    },
    {
        path: '/company/monitoring/residents',
        name: 'Company Monitoring / Residents',
        component: () => import('@/views/my-company/monitoring/residents'),
        meta:
        {
            name: 'Residents',

            page: 'list',
        },
    },
];