<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Recipient
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <form class="ap-form-stacked"
                    @submit.prevent="submit()">

                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="number"
                            :readonly="isLoading('update')"
                            :label="'* Mobile Number'"
                            :placeholder="'ex. 09XXXXXXXXX'"
                            v-model="form.mobile_number"
                            :error="hasError('mobile_number') ? errors.mobile_number[0] : ''"/>
                    </fieldset>
                </form>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        v-if="!isLoading('update')"
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
                        :loading="isLoading('update')">
                        Submit
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

            form:
            {
                mobile_number: '',
            }
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            recipient: 'myCompanySmsTransactionRecipient/selected',
            isLoading: 'myCompanySmsTransactionRecipient/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanySmsTransactionRecipient/update'
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/sms-transaction/${this.$route.params.code}/recipient/${this.recipient.id}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                this.initialize();

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

        initialize()
        {
            this.form.mobile_number = this.recipient.mobile_number;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('update', false);
        },
    },

    watch:
    {
        recipient()
        {
            this.initialize();
        },
    },
};
</script>
