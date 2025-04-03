<template>
    <ap-modal
        :isOpen.sync="$parent.$data.cancelStatusModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to cancel the status of
                    <span class="ap-text-bold">{{smsTransaction.code}}</span> SMS transaction.
                </p>

                <p>Do you want to continue?</p>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!submitLoading"
                        type="button"
                        class="ap-margin-small-right"
                        :rounded="true"
                        @click="closeModal()">
                        Cancel
                    </ap-button>
                    <ap-button
                        type="button"
                        @click="submit()"
                        :color="'primary'"
                        :rounded="true"
                        :loading="submitLoading">
                        Yes
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            submitLoading: false,
        };
    },

    computed:
    {
        ...mapGetters({
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransaction/isLoading',
        }),
    },

    methods:
    {
        async submit()
        {
            this.errors = {};
            
            this.submitLoading = true;
            
            const response = await Http.put(
                `/my-company/sms-transaction/${this.smsTransaction.slug.code}/status/cancel`,
                {},
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.smsTransaction.status = response.data.status;

                this.closeModal();

                Toast.success({
                    message: 'Data has been updated.'
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('cancelStatus', false);
        },
    },
};
</script>
