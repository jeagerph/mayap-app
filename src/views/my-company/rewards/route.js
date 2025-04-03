export default [
    {
        path: '/company/rewards',
        name: 'Company Rewards',
        component: () => import('@/views/my-company/rewards'),
        meta:
        {
            name: 'Incentives',

            page: 'list',
        },
    },
];