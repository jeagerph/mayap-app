import { Text } from '@/utils';

export const props = {
    props:
    {
        blank:
        {
            type: Boolean,
            default: false,
        },

        border:
        {
            type: Boolean,
            default: true,
        },

        error:
        {
            type: String,
            default: null,
        },

        label:
        {
            type: String,
            default: null,
        },

        margin:
        {
            type: Boolean,
            default: true,
        },

        size:
        {
            type: String,
            default: null, // 'small', 'large'
        },

        success:
        {
            type: Boolean,
            default: false,
        },

        value: [String, Number],

        width:
        {
            type: String,
            default: null, // 'xsmall', 'small', 'medium', 'large', '1-*'
        },
    },
};

export const computed = {
    computed:
    {
        listeners()
        {
            const vm = this;

            return Object.assign({},
                this.$listeners,
                {
                    input: (event) =>
                    {
                        vm.$emit('input', event.target.value);
                    },

                    change: (event) =>
                    {
                        vm.$emit('onchange', event.target.value);
                    },
                }
            );
        },

        wrapperClasses()
        {
            return Text.joinClass(
                this.margin && 'ap-margin'
            );
        },

        classes()
        {
            return Text.joinClass(
                'ap-input',
                this.blank ? 'ap-form-blank' :
                    !this.border && 'ap-border-none',
                this.success && 'ap-form-success',
                this.size && `ap-form-${this.size}`,
                this.width && `ap-form-width-${this.width}`,
                this.error && 'ap-form-danger'
            );
        },

        labelClasses()
        {
            return Text.joinClass(
                'ap-form-label',
                'ap-text-bold',
                this.error && 'ap-text-danger',
                this.success && 'ap-text-success'
            );
        },
    },
};
