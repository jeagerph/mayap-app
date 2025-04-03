<template>
    <div class="ap-margin">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">
                <p class="ap-margin-remove"
                    v-if="!isLoading('index') && items.length">
                    <ap-pagination-showing
                        :page="page"/>
                </p>
                <ap-querycrumbs
                    :queries="queries"
                    :onClick="reset" />
            </div>
            <div class="ap-text-right">
                <div v-if="!isLoading('index')">
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="true"
                        @click="openOffcanvas('main')">
                        <i class="lni lni-search ap-margin-xsmall-right"></i> Search
                    </ap-button>
                </div>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    name: 'Header',

    data()
    {
        return {
            queries:
            {
                'search': 
                {
                    name: '',
                    type: 'search',
                    icon: 'lni-search',
                    query: 'search',
                    options: ''
                },
                'filter[smsType]':
                {
                    name: 'Status',
                    type: 'filter',
                    icon: 'fa-filter',
                    query:  'filter[status]',
                    options: {
                        1: 'Unpaid',
                        2: 'Paid',
                        3: 'Canceled',
                    },
                },
                'range[transactionDate]':
                {
                    name: 'Filter',
                    type: 'search',
                    icon: 'fa-filter',
                    query:  'filter[transactionDate]',
                    options: '',
                }
            }
        };
    },

    computed:
    {
        ...mapGetters({
            items: 'myCompanySmsTransaction/items',
            isLoading: 'myCompanySmsTransaction/isLoading',
            page: 'myCompanySmsTransaction/page',
        }),
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },

        openOffcanvas(name)
        {
            this.$parent.toggleOffcanvas(name, true);
        },

        reset(name)
        {
            const query = Object.assign({}, this.$route.query);
            delete query[name];

            this.$router.replace({ query });
        },
    },
};
</script>
