<template>
    <div class="ap-margin">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">

            </div>
            <div v-if="!isLoading('index')">

                <ap-button
                    :color="'primary'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('create')">
                    <i class="lni lni-plus ap-margin-xsmall-right"></i> NEW CLASSIFICATION
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
            items: 'myCompanyOfficerClassification/items',
            isLoading: 'myCompanyOfficerClassification/isLoading',
            page: 'myCompanyOfficerClassification/page',
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
