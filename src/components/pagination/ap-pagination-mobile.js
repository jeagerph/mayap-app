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
                currentPage != 1 && total > 10
                    ? Node.pageIcon(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, 1),
                        page: 1,
                        icon: 'lni-angle-double-left',
                    })
                    : h(),

                currentPage != 1 && total > 10
                    ? Node.pageIcon(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, currentPage - 1),
                        page: currentPage - 1,
                        icon: 'lni-chevron-left', 
                    })
                    : h(),
            ];

            return nodes;
        },

        middleNodes(h)
        {
            const currentPage = parseInt(this.page.currentPage);
            const lastPage = parseInt(this.page.lastPage);
            const total = parseInt(this.page.total);

            const nodes = [
                total > 15
                ? Node.showingPage(h, {
                    currentPage: currentPage,
                    lastPage: lastPage,
                })
                : h(),
            ];

            return nodes;
        },

        endingNodes(h)
        {
            const currentPage = parseInt(this.page.currentPage);
            const lastPage = parseInt(this.page.lastPage);
            const total = parseInt(this.page.total);

            const nodes = [
                currentPage != lastPage && total > 10
                    ? Node.pageIcon(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, currentPage + 1),
                        page: currentPage + 1,
                        icon: 'lni-chevron-right', 
                    })
                    : h(),
                
                currentPage != lastPage && total > 10
                    ? Node.pageIcon(h, {
                        url: Text.formUrl(this.$route.query, this.page.url, lastPage),
                        page: lastPage,
                        icon: 'lni-angle-double-right',
                    })
                    : h(),
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
