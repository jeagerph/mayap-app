<template>
    <div class="ap-margin">
        
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
            items: 'companyBeneficiaryDocument/items',
            isLoading: 'companyBeneficiaryDocument/isLoading',
            page: 'companyBeneficiaryDocument/page',
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
