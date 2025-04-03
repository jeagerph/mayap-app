import { props, computed } from './mixin';

export default {
    inheritAttrs: false,

    mixins: [props, computed],

    render(h)
    {
        const vm = this;

        return h(
            'div',

            {
                class: this.wrapperClasses,
            },

            [
                Boolean(this.label) && h(
                    'label',

                    {
                        class: this.labelClasses,
                    },

                    this.label
                ),

                h(
                    'input',

                    {
                        class: this.classes,

                        attrs: this.$attrs,

                        domProps:
                        {
                            value: vm.value,
                        },

                        on:
                        {
                            input(event)
                            {
                                vm.$emit('input', event.target.value);
                            },

                            keyup()
                            {
                                vm.$emit('keyup');
                            },
                        },
                    }
                ),

                Boolean(this.error) && h(
                    'small',

                    {
                        class: 'ap-text-danger ap-text-bold',
                    },

                    [
                        h(
                            'i',

                            {
                                class: 'lni lni-close ap-margin-xsmall-right'
                            },
                        ),

                        this.error
                    ]
                ),
            ]
        );
    },
};
