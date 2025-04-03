<template>
    <div class="ap-text-right">
        <div v-if="!isLoading('index')">
            <ap-button
                v-if="items.length > 1"
                :color="'primary'"
                :size="'small'"
                :rounded="true"
                :outline="true"
                @click="openModal('arrange')">
                ARRANGE OFFICIALS
            </ap-button>

            <ap-button
                :color="'primary'"
                :size="'small'"
                :rounded="true"
                :outline="true"
                @click="openModal('create')">
                <i class="lni lni-plus ap-margin-xsmall-right"></i> NEW OFFICIAL
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
            items: 'adminBarangayOfficial/items',
            isLoading: 'adminBarangayOfficial/isLoading',
            page: 'adminBarangayOfficial/page',
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
