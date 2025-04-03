import { Text } from '@/utils';

export const props = {
    props:
    {
        label:
        {
            type: String,
            default: null
        },

        color:
        {
            type: String,
            default: 'secondary', // 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'
        },

        rounded:
        {
            type: Boolean,
            default: false,
        }
    },
};

export const computed = {
    computed:
    {
        classes()
        {
            return Text.joinClass(
                'badge',
                `bg-${this.color}`,
                this.rounded && `rounded-pill`,
            );
        },
    },
};

export const methods = {
    methods: {},
};
