<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadHouseholdByBarangayModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Download Household By Barangay Report
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <p class="ap-text-bold ap-text-italic">
                    Fill-out the form to filter data
                </p>

                <div class="ap-form-stacked">
                    <small class="ap-text-bold">
                        DATE REGISTERED
                    </small>

                    <ap-grid :gutter="'small'"
                        class="ap-margin-top">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                type="date"
                                :readonly="downloadLoading"
                                :label="'* Start Date'"
                                v-model="form.from"
                                @input="onChangeFrom"
                                :error="hasError('from') ? errors.from[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <ap-input
                                type="date"
                                :readonly="downloadLoading"
                                :label="'* End Date'"
                                v-model="form.to"
                                :error="hasError('to') ? errors.to[0] : ''"/>
                        </div>
                    </ap-grid>

                    <div class="ap-margin-medium-top">
                        <label class="ap-text-bold" for="household-by-barangay-include-list">
                            <input type="checkbox"
                                id="household-by-barangay-include-list"
                                class="ap-checkbox"
                                :true-value="1"
                                :false-value="0"
                                v-model="form.include_list">

                            <span class="ap-text-bold ap-text-italic ap-margin-small-left"
                                style="font-size: 14px;">
                                Include list?
                            </span>
                        </label>
                    </div>

                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!downloadLoading"
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
                            :loading="downloadLoading">
                            Yes
                        </ap-button>
                    </div>
                </div>
                
                
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
                include_list: 0,
                
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
            isLoading: 'companyBeneficiary/isLoading',
        }),

        downloadHouseholdByBarangayModal()
        {
            return this.$parent.$data.downloadHouseholdByBarangayModal;
        }
    },

    methods:
    {
        async submit()
        {
            this.errors = {};

            let url = `/my-company/beneficiaries/household/by-barangay/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;
                url += `&filter[isHousehold]=1`;
                url += `&includeList=${this.form.include_list}`;

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
            this.$parent.toggleModal('downloadHouseholdByBarangay', false);
        },
    },
};
</script>
