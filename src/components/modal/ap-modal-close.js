import { Text } from '@/utils';

export default {
    props:
    {
        click:
        {
            type: Function,
            default: null,
        },
    },

    render(h)
    {
        return h(
            'a',

            {
                class: Text.joinClass(
                    'ap-close',
                    'ap-modal-close',
                    'ap-point'
                ),

                on:
                {
                    click: (e) =>
                    {
                        this.$emit('click', e);
                    },
                },
            },

            [
                h(
                    'i',
                    {
                        class: 'lni lni-close',
                    },
                ),
            ]
        );
    },
};
