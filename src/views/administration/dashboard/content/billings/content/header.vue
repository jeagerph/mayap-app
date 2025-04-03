<template>
    <div class="ap-margin">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">
                
            </div>
            <div>
               
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
                'filter[userStatus]':
                {
                    name: 'Status',
                    type: 'filter',
                    icon: 'fa-filter',
                    query:  'filter[userStatus]',
                    options: {
                        0: 'Active',
                        1: 'Locked',
                    },
                },
                'filter[accountType]':
                {
                    name: 'Account Type',
                    type: 'filter',
                    icon: 'fa-filter',
                    query:  'filter[accountType]',
                    options: {
                        1: 'System Administrator',
                        2: 'Administrator',
                        3: 'Staff',
                    },
                },
            }
        };
    },

    computed:
    {
        ...mapGetters({
            items: 'adminDashboardBilling/items',
            isLoading: 'adminDashboardBilling/isLoading',
            page: 'adminDashboardBilling/page',
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
