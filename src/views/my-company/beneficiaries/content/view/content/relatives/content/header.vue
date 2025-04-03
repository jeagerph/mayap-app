<template>
    <div class="ap-margin-top">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">
                <!-- <h5 class="ap-text-bold ap-text-primary">
                    FAMILY/RELATIVES
                </h5> -->
            </div>
            <div v-if="!isLoading('index')">

                <ap-button
                    v-if="items.length > 1"
                    :color="'primary'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('arrange')">
                    ARRANGE RELATIVES
                </ap-button>

                <ap-button
                    :color="'primary'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('create')">
                    <i class="lni lni-plus ap-margin-xsmall-right"></i> ADD RELATIVE
                </ap-button>
            </div>
        </ap-grid>
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
            items: 'companyBeneficiaryRelative/items',
            isLoading: 'companyBeneficiaryRelative/isLoading',
            page: 'companyBeneficiaryRelative/page',
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
