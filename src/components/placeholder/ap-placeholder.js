export default {
    functional: true,

    props:
    {
        type:
        {
            type: String,
            default: 'bar' // bar, image
        },

        size:
        {
            type: String,
            default: 'small',
        },

        width:
        {
            type: String,
            default: '100%'
        },

        height:
        {
            type: String,
        },
    },

    render(h, {data, props})
    {
        return h(
            'div',
            {
                staticClass: data.staticClass,

                class:
                [
                    'ap-placeholder',
                    `ap-placeholder-${props.type}`,
                    `ap-placeholder-${props.type}-${props.size}`,
                    'ap-animate',
                    'ap-animate-infinite',
                    'ap-animate-shimmer',
                ],
                
                style:
                {
                    width: props.width,
                    height: props.height,
                },
            }
        );
    },
};
