import { Text } from '@/utils';

export const props = {
    props:
    {
        color:
        {
            type: String,
            default: 'default', // 'default', 'primary', 'secondary', 'success', 'warning', 'danger'
        },

        disabled:
        {
            type: Boolean,
            default: false,
        },

        fullWidth:
        {
            type: Boolean,
            default: false,
        },

        ghost:
        {
            type: Boolean,
            default: false,
        },

        href:
        {
            type: String,
            default: null,
        },

        loading:
        {
            type: Boolean,
            default: false,
        },

        link:
        {
            type: Boolean,
            default: false,
        },

        outline:
        {
            type: Boolean,
            default: false,
        },

        size:
        {
            type: String,
            default: null, // 'small', 'large'
        },

        text:
        {
            type: Boolean,
            default: false,
        },

        rounded:
        {
            type: Boolean,
            default: true, 
        }
    },
};

export const computed = {
    computed:
    {
        classes()
        {
            return Text.joinClass(
                'ap-button',
                this.link ? 'ap-button-link' :
                    this.ghost ? 'ap-button-ghost ap-button-ghost-default' :
                        this.text ? `ap-button-text ap-button-text-${this.color}` :
                            this.outline ? `ap-button-outline ap-button-outline-${this.color}` :
                                this.color && `ap-button-${this.color}`,
                this.size && `ap-button-${this.size}`,
                this.fullWidth && 'ap-width-1-1',
                this.rounded && `ap-button-full-rounded`,
            );
        },

        isAnchor()
        {
            return this.href !== undefined && this.href !== null;
        },
    },
};

export const methods = {
    methods:
    {
        onClick(e)
        {
            this.$emit('click', e);
        },
    },
};
