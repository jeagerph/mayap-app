export default {
    functional: true,

    props:
    {
        label:
        {
            type: String,
            default: null,
        },
    },

    render(h, { data, props })
    {
        return h(
            'div',
            {
                staticClass: data.staticClass,

                class:
                [
                    'ap-card',
                    'ap-card-body',
                    'ap-card-small',
                    'ap-padding-small',
                    'ap-text-center',
                ],
            },
            [
                h(
                    'h3',
                    {
                        class: 'ap-margin-remove'
                    },
                    
                    props.label
                ),

                h(
                    'img',

                    {
                        attrs:
                        {
                            class:
                            [
                                'ap-margin-small-top',
                            ],
                            src: '/static/assets/images/empty.png',
                            alt: 'Empty Illustration',
                            width: '400',
                            height: '400',
                        },
                    },
                ),
            ]
        );
    },
};
