<template>
    <div>
        <p class="ap-margin-remove"
            v-if="!isLoading('index') && items.length">
            <ap-pagination-showing
                :page="page"/>
        </p>
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
            items: 'companyAssistance/items',
            isLoading: 'companyAssistance/isLoading',
            page: 'companyAssistance/page',
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
