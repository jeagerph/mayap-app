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
                        'ap-signature',
                        props.shape && `ap-signature-${props.shape}`,
                        props.outline && 'ap-signature-outline',
                        props.active && 'ap-active',
                        !props.color && `ap-signature-${props.color}`,
                        props.size && `ap-signature-${props.size}`,
                        props.src && 'ap-signature-image',
                        props.outlineShape && `ap-signature-outline-${props.outlineShape}-rounded`
                    ],
            },
            [
                props.src
                    ? ''
                    : h(
                        'div',

                        {
                            class: 'ap-signature-content',
                        },

                        [
                            h(
                                'div',

                                [
                                    h(
                                        'span',
                                        {
                                            class: 'ap-signature-label',
                                        },
                                        props.label
                                    ),

                                    props.subLabel
                                        ? h(
                                            'span',
                                            {
                                                class: 'ap-signature-sublabel',
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
