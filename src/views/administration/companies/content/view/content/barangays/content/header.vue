<template>
    <div class="ap-text-right">
        <div v-if="!isLoading('index')">
            <ap-button
                :color="'primary'"
                :size="'small'"
                :rounded="true"
                :outline="true"
                @click="openModal('create')">
                <i class="lni lni-plus ap-margin-xsmall-right"></i> NEW BARANGAY
            </ap-button>
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
            items: 'adminCompanyBarangay/items',
            isLoading: 'adminCompanyBarangay/isLoading',
            page: 'adminCompanyBarangay/page',
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
