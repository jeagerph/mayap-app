<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateMessageModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Message
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <form class="ap-form-stacked"
                    @submit.prevent="submit()">

                    <fieldset class="ap-fieldset">

                        <small class="ap-text-bold">
                            MESSAGE:
                        </small>

                        <textarea
                            class="ap-textarea ap-textarea-message"
                            cols="30"
                            rows="5"
                            :required="true"
                            :placeholder="'type your message here...'"
                            v-model="form.message">
                        </textarea>
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
                message: '',
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
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransaction/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanySmsTransaction/update'
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/sms-transaction/${this.$route.params.code}/message`,
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
            this.form.message = this.smsTransaction.message;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('updateMessage', false);
        },
    },

    watch:
    {
        smsTransaction()
        {
            this.initialize();
        },
    },
};
</script>
