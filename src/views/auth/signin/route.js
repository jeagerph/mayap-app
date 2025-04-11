export default [
    {
        path: '/signin',

        name: 'Signin',

        meta:
        {
            page: 'signin'
        },

        component: () => import('@/views/auth/signin'),
    },
];
