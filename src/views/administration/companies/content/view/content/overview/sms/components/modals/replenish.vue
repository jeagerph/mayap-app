<template>
    <ap-modal
        :isOpen.sync="$parent.$data.replenishModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Replenish SMS Credit Balance
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <div class="ap-margin ap-text-center">
                    <h5
                        v-if="!isLoading('show')">
                        {{ company.name}}
                    </h5>
                </div>

                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <ap-input
                            type="number"
                            step=".01"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* Credit Amount'"
                            v-model="form.amount"
                            :error="hasError('amount') ? errors.amount[0] : ''"/>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Remarks
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="5"
                                :readonly="submitLoading"
                                :placeholder="'any remarks here...'"
                                v-model="form.remarks">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('remarks')">
                                    {{errors.remarks[0]}}
                            </small>
                        </div>
                    </fieldset>

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
                            type="submit"
                            :color="'primary'"
                            :rounded="true"
                            :loading="submitLoading">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form, Toast, Dater } from '@/utils';

import Http from '@/services';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                credit_date: '',
                credit_mode: 1,
                amount: 0.00,
                remarks: '',
            },

            submitLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            company: 'adminCompany/selected',
            isLoading: 'adminCompany/isLoading',
        }),
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/administration/company/${this.$route.params.code}/sms/credit`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                this.$parent.$data.summary.sms_credit = parseFloat(this.$parent.$data.summary.sms_credit) + parseFloat(response.data.amount);
                this.$parent.$data.summary.last_replenish_sms_credit_record = response.data;

                this.initialize();
                
                this.closeModal();

                Toast.success({
                    message: 'Data has been created.'
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
            this.form.credit_date = Dater.rawToday();
            this.form.amount = 0.00; 
            this.form.remarks = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('replenish', false);
        },
    },
};
</script>
