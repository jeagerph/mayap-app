export default {
    functional: true,

    props:
    {
        page: Object,
    },

    render(h, { props })
    {

        const nodes = [
            h(
                'ap-pagination-desktop',
                {
                    props:
                    {
                        page: props.page,

                        customClass: 'ap-visible@m',
                    },
                },
            ),
            h(
                'ap-pagination-mobile',
                {
                    props:
                    {
                        page: props.page,

                        customClass: 'ap-hidden@m',
                    },
                },
            ),
        ];

        return nodes;
    },
};
