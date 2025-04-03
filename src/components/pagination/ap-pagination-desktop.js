import { Text } from '@/utils';
import { Node } from './mixin';

export default {
    // functional: true,

    props:
    {
        page:
        {
            type: Object,
        },

        customClass:
        {
            type: String,
            default: ''
        },
    },

    methods:
    {
        startingNodes(h)
        {
            const currentPage = parseInt(this.page.currentPage);
            const total = parseInt(this.page.total);

            const nodes = [
                currentPage >= 4 && total > 10
                    ? Node.pageIcon(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, 1),
                        page: 1,
                        icon: 'lni-angle-double-left',
                    })
                    : h(),

                currentPage >= 4 && total > 10
                    ? Node.icon(h, {
                        icon: 'lni-line-dotted',
                    })
                    : h()
            ];

            return nodes;
        },

        middleNodes(h)
        {
            const currentPage = parseInt(this.page.currentPage);
            const lastPage = parseInt(this.page.lastPage);

            const nodes = [];

            if (currentPage < 4)
            {
                for (let i = 1; i <= 5; i++)
                {
                    const page = Node.page(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, i),
                        currentPage: currentPage,
                        page: i
                    });

                    nodes.push(page);
                }
            }
            else if ((lastPage - currentPage) < 4)
            {
                for (let i = (lastPage - 4); i <= lastPage; i++)
                {
                    const page = Node.page(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, i),
                        currentPage: currentPage,
                        page: i
                    });

                    nodes.push(page);
                }
            }
            else
            {
                const start = currentPage - 2;
                const end = currentPage + 2;

                for (let i = start; i <= end; i++)
                {
                    const page = Node.page(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, i),
                        currentPage: currentPage,
                        page: i
                    });

                    nodes.push(page);
                }
            }

            return nodes;
        },

        endingNodes(h)
        {
            const currentPage = parseInt(this.page.currentPage);
            const lastPage = parseInt(this.page.lastPage);
            const total = parseInt(this.page.total);

            const nodes = [
            (lastPage - currentPage) > 4 && total > 10
                    ? Node.icon(h, {
                        icon: 'lni-line-dotted',
                    })
                    : h(),

            (lastPage - currentPage) >= 4 && total > 10
                ? Node.pageIcon(h, {
                    url: Text.formUrl(this.$route.query, this.page.url, lastPage),
                    page: lastPage,
                    icon: 'lni-angle-double-right',
                })
                : h()
            ];

            return nodes;
        },
    },

    render(h)
    {
        return h(
            'div',
            {
                class: this.customClass,
            },
            [
                ...this.startingNodes(h),

                ...this.middleNodes(h),

                ...this.endingNodes(h),
            ]
        )
    },
};
