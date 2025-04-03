export default {
    functional: true,

    props:
    {
        item: Object,
    },

    render(h, { data, props, listeners })
    {
        return h(
            'div',

            {
                staticClass: data.staticClass,

                class: [
                    'ap-chips',
                    'ap-flex-middle',
                    'ap-margin-small-top',
                ],
            },

            [
                h(
                    'div',

                    [
                        h(
                            'i',
                            {
                                class: [
                                    `lni ${props.item.icon}`,
                                    'ap-margin-xsmall-right',
                                ]
                            }
                        ),
                        props.item.value,
                    ],
                ),
                listeners.reset
                    ? h(
                        'div',
                        {
                            class: 'ap-margin-small-left',
                        },
    
                        [
                            h(
                                'a',
                                {
                                    class: 'ap-link-reset ap-point',
                                },
                                [
                                    h(
                                        'i',
                                        {
                                            class: 'lni lni-close',
    
                                            on:
                                            {
                                                click: listeners.reset
                                            },
                                        },
                                    ),
                                ]
                            ),
                        ]
                    )
                    : h()
                
            ]
        );
    },
};
