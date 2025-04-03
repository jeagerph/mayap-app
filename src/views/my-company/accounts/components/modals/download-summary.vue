<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadSummaryModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Download Encoding Report
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <h3 class="ap-text-bold ap-text-center">
                    {{ account.full_name }}
                </h3>

                <form class="ap-form-stacked ap-margin-top"
                    @submit.prevent="submit()">

                    <fieldset class="ap-fieldset">
                        <ap-input
                            type="date"
                            :readonly="downloadLoading"
                            :required="true"
                            :label="'* Start Date'"
                            v-model="form.from"
                            @input="onChangeFrom"
                            :error="hasError('from') ? errors.from[0] : ''"/>

                        <ap-input
                            type="date"
                            :readonly="downloadLoading"
                            :required="true"
                            :label="'* End Date'"
                            v-model="form.to"
                            :error="hasError('to') ? errors.to[0] : ''"/>


                        <div class="ap-margin-medium-top">
                            <label class="ap-text-bold" for="include-beneficiaries">
                                <input type="checkbox"
                                    id="include-beneficiaries"
                                    class="ap-checkbox"
                                    :true-value="1"
                                    :false-value="0"
                                    v-model="form.includeBeneficiaries">

                                <span class="ap-text-bold ap-text-italic ap-margin-small-left"
                                    style="font-size: 14px;">
                                    Include Beneficiary list?
                                </span>
                            </label>
                        </div>

                        <div class="ap-margin-xsmall-top">
                            <label class="ap-text-bold" for="include-assistances">
                                <input type="checkbox"
                                    id="include-assistances"
                                    class="ap-checkbox"
                                    :true-value="1"
                                    :false-value="0"
                                    v-model="form.includeAssistances">

                                <span class="ap-text-bold ap-text-italic ap-margin-small-left"
                                    style="font-size: 14px;">
                                    Include Assistance list?
                                </span>
                            </label>
                        </div>

                        <div class="ap-margin-xsmall-top">
                            <label class="ap-text-bold" for="include-patients">
                                <input type="checkbox"
                                    id="include-patients"
                                    class="ap-checkbox"
                                    :true-value="1"
                                    :false-value="0"
                                    v-model="form.includePatients">

                                <span class="ap-text-bold ap-text-italic ap-margin-small-left"
                                    style="font-size: 14px;">
                                    Include Patient list?
                                </span>
                            </label>
                        </div>

                    </fieldset>
                    

                    <div class="ap-margin-top ap-text-right">
                        <ap-button
                            v-if="!downloadLoading"
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
                            :loading="downloadLoading">
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

import Http from '@/services';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                from: '',
                to: '',
                includeBeneficiaries: 0,
                includeAssistances: 0,
                includePatients: 0,
            },

            downloadLoading: false,
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
            companyAccount: 'myCompanyAccount/selected',
        }),

        account()
        {
            return this.companyAccount.account;
        },

        downloadSummaryModal()
        {
            return this.$parent.$data.downloadSummaryModal;
        }
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            let url = `/my-company/account/${this.companyAccount.slug.code}/summary/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;
                url += `&includeBeneficiaries=${this.form.includeBeneficiaries}`;
                url += `&includeAssistances=${this.form.includeAssistances}`;
                url += `&includePatients=${this.form.includePatients}`;

            this.downloadLoading = true;
            
            const response = await Http.get(url);

            this.downloadLoading = false;

            if (response.status === 200)
            {
                window.open(response.data.path);

                this.closeModal();

                Toast.success({
                    message: 'Data has been downloaded.'
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

        onChangeFrom()
        {
            this.form.to = this.form.from;
        },

        initialize()
        {
            this.form.from = Dater.rawToday();
            this.form.to = Dater.rawToday();
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('downloadSummary', false);
        },
    },

    watch:
    {
        downloadSummaryModal(val)
        {
            if (val) this.initialize();
        }
    }
};
</script>
