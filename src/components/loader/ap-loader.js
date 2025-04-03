export default {
    functional: true,

    props:
    {

        color:
        {
            type: String,
            default: 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'inverse'
        },

        size:
        {
            type: String,
            default: null, // 'xsmall', 'small', 'medium', 'large'
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
                        'ap-loader',
                        `ap-loader-${props.color}`,
                        props.size && `ap-loader-${props.size}`,
                    ],
            },
        );
    },
};
