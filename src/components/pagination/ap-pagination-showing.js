export default {
    functional: true,

    props:
    {
        page:
        {
            type: Object,
        },
    },


    render(h, { data, props })
    {
        return h(
            'div',
            {
                staticClass: data.staticClass,
            },
            [
                h(
                    'span',
                    props.page.total > 0
                        ? `Showing ${props.page.from} to ${props.page.to} of ${props.page.total} ${props.page.total > 1 ? 'records' : 'record'}`
                        : 'No record found'
                ),
            ]
        );
    },
};
