<template>
    <ap-modal
        :isOpen.sync="$parent.$data.deleteModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Are you sure?
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p>
                    You are about to delete
                    <span class="ap-text-bold">{{invoice.invoice_no}}</span>.
                </p>

                <p>Do you want to continue?</p>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!isLoading('delete')"
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
                        :loading="isLoading('delete')">
                        Yes
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},
        };
    },

    computed:
    {
        ...mapGetters({
            invoice: 'adminInvoice/selected',
            isLoading: 'adminInvoice/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            destroy: 'adminInvoice/destroy',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.destroy({
                url: `/administration/invoice/${this.invoice.slug.code}`,
                item: this.invoice,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Invoice has been deleted.'
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
            this.$parent.toggleModal('delete', false);
        },
    },
};
</script>
