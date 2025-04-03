<template>
    <div class="ap-margin">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">

            </div>
            <div v-if="!isLoading('index')">

                <ap-button
                    v-if="items.length > 1"
                    :color="'primary'"
                    :size="'small'"
                    :rounded="'full'"
                    :outline="true"
                    @click="openModal('arrange')">
                    <i class="lni lni-plus ap-margin-xsmall-right"></i> ARRANGE
                </ap-button>

                <ap-button
                    :color="'primary'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('create')">
                    <i class="lni lni-plus ap-margin-xsmall-right"></i> NEW ASSIGNATORY
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
            items: 'myCompanyAssignatory/items',
            isLoading: 'myCompanyAssignatory/isLoading',
            page: 'myCompanyAssignatory/page',
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
