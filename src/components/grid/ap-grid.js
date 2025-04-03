import { Text } from '@/utils';

export default {
    functional: true,

    props:
    {
        divider:
        {
            type: Boolean,
            default: false,
        },

        gutter:
        {
            type: String,
            default: null, // 'small', 'medium', 'large', 'collapse'
        },

        matchHeight:
        {
            type: Boolean,
            default: false,
        },
    },

    render(h, { props, data, children })
    {
        return h(
            'div',

            {
                staticClass: data.staticClass,

                class: Text.joinClass(
                    'ap-grid',
                    props.gutter && `ap-grid-${props.gutter}`,
                    props.divider && 'ap-grid-divider',
                    props.matchHeight && 'ap-grid-match'
                ),
            },

            children
        );
    },
};
