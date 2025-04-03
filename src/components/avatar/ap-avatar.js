export default {
    functional: true,

    props:
    {
        shape:
        {
            type: String,
            default: 'circle', // 'default', 'circle'
        },

        outline:
        {
            type: Boolean,
            default: false,
        },

        outlineShape:
        {
            type: String,
            default: null, // 'semi', 'full'
        },

        active:
        {
            type: Boolean,
            default: false,
        },

        color:
        {
            type: String,
            default: 'default', // 'default', 'primary', 'secondary'
        },

        label:
        {
            type: String,
            required: true,
        },

        size:
        {
            type: String,
            default: null, // 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'
        },

        src:
        {
            type: String,
            default: null,
        },

        subLabel:
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
                        'ap-avatar',
                        props.shape && `ap-avatar-${props.shape}`,
                        props.outline && 'ap-avatar-outline',
                        props.active && 'ap-active',
                        !props.color && `ap-avatar-${props.color}`,
                        props.size && `ap-avatar-${props.size}`,
                        props.src && 'ap-avatar-image',
                        props.outlineShape && `ap-avatar-outline-${props.outlineShape}-rounded`
                    ],
            },
            [
                props.src
                    ? ''
                    : h(
                        'div',

                        {
                            class: 'ap-avatar-content',
                        },

                        [
                            h(
                                'div',

                                [
                                    h(
                                        'span',
                                        {
                                            class: 'ap-avatar-label',
                                        },
                                        props.label
                                    ),

                                    props.subLabel
                                        ? h(
                                            'span',
                                            {
                                                class: 'ap-avatar-sublabel',
                                            },
                                            props.subLabel
                                        )
                                        : '',
                                ]
                            ),
                        ]
                    ),

                props.src && h(
                    'img',
                    {
                        attrs:
                        {
                            src: props.src,
                            alt: props.label,
                        },
                    }
                ),
            ]
        );
    },
};
