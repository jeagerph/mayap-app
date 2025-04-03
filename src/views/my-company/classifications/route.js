export default [
    {
        path: '/company/classifications',

        name: 'Company Classifications',

        component: () => import('@/views/my-company/classifications'),

        meta:
        {
            name: 'Classifications'
        }
    },
];