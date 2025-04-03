<template>
    <div class="card card-body">

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand">
                <p class="ap-text-bold ap-text-primary ap-margin-small">
                    MESSAGE
                </p>
            </div>
            <div class="ap-text-right"
                v-if="!isLoading('show')">
                <ap-button
                    v-show="smsTransaction.status.id == 1"
                    class="ap-margin-xsmall-right"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('updateMessage')">
                    UPDATE
                </ap-button>
            </div>
        </ap-grid>

        

        <div class="ap-margin-small-top">
            <div v-if="!isLoading('show')">

                <div v-html="smsTransaction.message"
                    style="white-space: pre-wrap;"></div>
            </div>

            <div v-else>
                <ap-placeholder
                    :size="'medium'" />
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    :size="'medium'" />
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    :size="'medium'" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransaction/isLoading',
        }),
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
}
</script>
