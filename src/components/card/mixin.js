import { Text } from '@/utils';

export const props = {
    props:
    {
        color:
        {
            type: String,
            default: 'white', // white, default, primary, secondary, success, warning, danger
        },

        size:
        {
            type: String,
            default: null, // small, medium, large
        },

        boxShadow:
        {
            type: String,
            default: null, // small, medium, large
        },
    },
};

export const computed = {
    computed:
    {
        classes()
        {
            return Text.joinClass(
                'ap-card',
                'ap-card-body',
                `ap-card-${this.color}`,
                this.size && `ap-card-${this.size}`,
                this.boxShadow && `ap-box-shadow-${this.boxShadow}`
            );
        },
    },
};

export const methods = {
    methods: {},
};
