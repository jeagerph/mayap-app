export default {
    functional: true,

    render(h, { data, slots })
    {
        return h(
            'div',

            {
                staticClass: data.staticClass,

                class: 'ap-modal-body',
            },

            slots().default
        );
    },
};
