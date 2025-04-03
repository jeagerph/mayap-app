// Utils
import { Text } from '@/utils';

export default {
    props:
    {
        isOpen:
        {
            type: Boolean,
            default: false,
        },

        items:
        {
            type: Array,
            default: null,
        },

        onSelect:
        {
            type: Function,
        },

        loading:
        {
            type: Boolean,
            default: false,
        }
    },

    render(h)
    {
        return h(
            'div',

            {
                class: Text.joinClass(
                    'ap-autocomplete',
                    this.isOpen ? 'ap-open' : ''
                ),
            },

            [
                !this.loading
                    ? this.items.length !== 0
                        ? h(
                            'ul',

                            {
                                class: 'ap-list ap-autocomplete-list',
                            },

                            [
                                this.items.map(item => h(
                                    'li',

                                    {
                                        on:
                                        {
                                            click: () =>
                                            {
                                                this.onSelect(item);
                                                this.$emit('update:isOpen', false);
                                            },
                                        },
                                    },

                                    [
                                        h(
                                            'h5',

                                            {
                                                class: 'ap-text-bold ap-margin-remove',
                                            },

                                            item.title
                                        ),

                                        h(
                                            'p',

                                            {
                                                class: 'ap-margin-remove',
                                            },

                                            item.label
                                        ),
                                    ]
                                )),
                            ]
                        )

                        : h(
                            'div',

                            {
                                class: 'ap-padding',
                            },

                            [
                                h(
                                    'p',

                                    {
                                        class: 'ap-text-lead ap-margin-remove',
                                    },

                                    'No results found'
                                ),

                                h(
                                    'p',

                                    {
                                        class: 'ap-text-meta ap-margin-remove',
                                    },

                                    'Your search returned no results'
                                ),
                            ]
                        )
                    : h(
                        'div',

                        {
                            class: 'ap-padding-small',
                        },

                        [
                            h(
                                'p',

                                {
                                    class: 'ap-text-lead ap-margin-remove',
                                },

                                'Searching...'
                            ),
                        ]
                    ),
            ]
        );
    },
};
