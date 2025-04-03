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
            <div>
                <div v-if="!isLoading('index')">
                    <router-link
                        class="ap-button ap-button-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                        to="/administration/companies/create">
                        <i class="lni lni-plus ap-margin-xsmall-right"></i> Create
                    </router-link>
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
                'filter[status]':
                {
                    name: 'Status',
                    type: 'filter',
                    icon: 'fa-filter',
                    query:  'filter[userStatus]',
                    options: {
                        0: 'SUSPENDED',
                        1: 'ACTIVE',
                    },
                },
            }
        };
    },

    computed:
    {
        ...mapGetters({
            items: 'adminCompany/items',
            isLoading: 'adminCompany/isLoading',
            page: 'adminCompany/page',
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
