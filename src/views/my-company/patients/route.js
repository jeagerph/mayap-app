export default [
    {
        path: '/company/patients',

        name: 'Company / Patients',

        component: () => import('@/views/my-company/patients'),

        meta:
        {
            name: 'Patients'
        }
    },
];