export default {
    functional: true,

    render(h, { data, slots })
    {
        return h(
            'h3',

            {
                staticClass: data.staticClass,

                class: 'ap-offcanvas-title',
            },

            slots().default
        );
    },
};
