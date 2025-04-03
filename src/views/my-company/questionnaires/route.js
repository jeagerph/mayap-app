export default [
    {
        path: '/company/questionnaires',

        name: 'Company Questionnaires',

        component: () => import('@/views/my-company/questionnaires'),

        meta:
        {
            name: 'Questionnaires'
        }
    },
];