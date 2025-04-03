<template>
    <div class="ap-margin">
        <h4 class="ap-text-bold">
            LIST OF ASSISTANCE
        </h4>

        <div class="ap-margin-top">
            <p class="ap-margin-remove"
                v-if="!isLoading('index') && items.length">
                <ap-pagination-showing
                    :page="page"/>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    name: 'Header',

    computed:
    {
        ...mapGetters({
            items: 'companyDashboardAssistance/items',
            isLoading: 'companyDashboardAssistance/isLoading',
            page: 'companyDashboardAssistance/page',
        }),
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
