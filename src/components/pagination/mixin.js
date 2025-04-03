const classes = [
    'btn',
    'btn-sm',
    'radius-30',
    'ap-margin-xsmall-right',
];

export const Node = {

    icon: (h, { icon }) => 
    {
        return h(
            'a',
            {
                class: [
                    ...classes,
                    'btn-white',
                ],

                attrs:
                {
                    disabled: true,
                },
            },
            [
                h(
                    'i',
                    {
                        class: `lni ${icon}`
                    }
                ),
            ]
        );
    },

    page: (h, { url, currentPage, page }) =>
    {
        return h(
            'router-link',
            {
                class: [
                    ...classes,

                    currentPage == page
                        ? 'btn-primary'
                        : 'btn-white'
                ],
                props:
                {
                    to: url,
                },
            },
            page
        );
    },

    pageIcon: (h, { url, page, icon }) =>
    {
        return h(
            'router-link',
            {
                class: [
                    ...classes,
                    'btn-white',
                ],
                props:
                {
                    to: url,
                },
                attrs:
                {
                    'data-tooltip': page
                },
            },
            [
                h(
                    'i',
                    {
                        class: `lni ${icon}`
                    }
                )
            ]
        );
    },

    showingPage: (h, { currentPage, lastPage }) =>
    {
        return h(
            'a',
            {
                class: [
                    ...classes,
                    'btn-primary',
                ],
                
                style:
                {
                    'color': 'white',
                },
            },
            `${currentPage} of ${lastPage}`,
        );
    },
};
