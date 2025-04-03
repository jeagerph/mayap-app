// Utils
import { Text } from '@/utils';

// Mixinx
import { props, computed, methods } from './mixin';

export default {

    mixins: [props, computed, methods],

    render(h)
    {
        return h(
            this.isAnchor ? 'a' : 'button',
            {
                class: this.classes,

                attrs:
                {
                    disabled: this.disabled || this.loading,
                    href: this.isAnchor ? this.href : false,
                },

                on:
                {
                    click: this.onClick,
                },
            },
            [
                this.loading ?
                    h(
                        'transition',
                        {
                            on:
                            {
                                name: 'fade',
                                mode: 'out-in',
                            },
                        },
                        [
                            h(
                                'i',
                                {
                                    class: Text.joinClass(
                                        'lni',
                                        'lni-spinner',
                                        'ap-animate',
                                        'ap-animate-infinite',
                                        'ap-animate-rotate'
                                    ),
                                }
                            ),
                        ]
                    )
                    : this.$slots.default,
            ]
        );
    },
};
