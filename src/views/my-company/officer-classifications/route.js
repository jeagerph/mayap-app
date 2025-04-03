export default [
    {
        path: '/company/officer-classifications',

        name: 'Company OfficerClassifications',

        component: () => import('@/views/my-company/officer-classifications'),

        meta:
        {
            name: 'Officer/Leader Classifications'
        }
    },
];