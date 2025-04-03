export default [
    {
        path: '/company/call',

        name: 'Company Call',

        component: () => import('@/views/my-company/call-new'),

        meta:
        {
            name: 'Call'
        }
    },
];