<template>
    <div class="ap-margin-top ap-card ap-card-body ap-card-default ap-padding-small">
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <small class="ap-text-bold">
                    DOCUMENT BORDER
                </small>
                
                <div class="ap-margin-top"
                    v-if="!isLoading('caseSetting')">
                    <img v-if="caseSetting.header_border"
                        :src="caseSetting.header_border" />

                    <p class="ap-text-italic"
                        v-else>
                        Default border
                    </p>
                </div>
                <ap-placeholder
                    v-else
                    :size="'medium'" />
            </div>
            <div class="ap-text-right"
                v-if="!isLoading('caseSetting')">
                <ap-button
                    type="button"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    @click="openModal('updateBorder')">
                    UPDATE
                </ap-button>
            </div>
        </ap-grid>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            caseSetting: 'adminBarangay/caseSetting',
            isLoading: 'adminBarangay/isLoading',
        }),

        hasCaseSetting()
        {
            return Object.keys(this.caseSetting).length > 0;
        }
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
