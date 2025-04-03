<template>
    <div class="ap-margin">
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand">

            </div>
            <div v-if="!isLoading('index')"
                class="ap-text-right">
                <ap-button
                    v-permit:access="'company-accounts-download-reports'"
                    :color="'success'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('download')">
                    <i class="lni lni-download ap-margin-xsmall-right"></i> REPORT
                </ap-button>

                <span class="ap-margin-small-left ap-margin-small-right">
                    |
                </span>
                
                <ap-button
                    v-permit:access="'company-accounts-download-reports'"
                    :color="'primary'"
                    :size="'small'"
                    :rounded="true"
                    :outline="true"
                    @click="openModal('create')">
                    <i class="lni lni-plus ap-margin-xsmall-right"></i> NEW ACCOUNT
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
            items: 'myCompanyAccount/items',
            isLoading: 'myCompanyAccount/isLoading',
            page: 'myCompanyAccount/page',
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
