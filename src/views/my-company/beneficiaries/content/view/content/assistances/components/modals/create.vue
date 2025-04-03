<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Add Assistance to <span class="ap-text-bold">{{ beneficiary.full_name }}</span>
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="date"
                            :readonly="isLoading('store')"
                            :label="'* Request Date'"
                            v-model="form.assistance_date"
                            :error="hasError('assistance_date') ? errors.assistance_date[0] : ''"/>

                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                    <ap-input
                                        list="assistanceTypeOptions"
                                        type="text"
                                        :readonly="isLoading('store')"
                                        :label="'* Type of Assistance'"
                                        :required="true"
                                        :placeholder="'ex. FINANCIAL ASSISTANCE'"
                                        v-model="form.assistance_type"
                                        :error="hasError('assistance_type') ? errors.assistance_type[0] : ''"/>

                                    <datalist id="assistanceTypeOptions">
                                        <option value="FINANCIAL ASSISTANCE" />
                                        <option value="GUARANTEE LETTER" />
                                        <option value="MEDICAL/MEDICINE" />
                                        <option value="DENTAL" />
                                        <option value="EDUCATION/SCHOLARSHIP" />
                                        <option value="JOB" />
                                        <option value="HOUSING" />
                                        <option value="BURIAL" />
                                        <option value="HEALTH SERVICE" />
                                    </datalist>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                    <ap-input
                                        type="number"
                                        :readonly="isLoading('store')"
                                        :label="'Amount (if applicable)'"
                                        :required="true"
                                        v-model="form.assistance_amount"
                                        :error="hasError('assistance_amount') ? errors.assistance_amount[0] : ''"/>
                                </div>
                            </ap-grid>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Other Remarks
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="5"
                                :readonly="isLoading('store')"
                                :placeholder="'any remarks here...'"
                                v-model="form.remarks">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('remarks')">
                                    {{errors.remarks[0]}}
                            </small>
                        </div>

                        <div class="ap-margin-top">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <label class="ap-form-label ap-text-bold">
                                        Assisted?
                                    </label>

                                    <div class="ap-inline ap-margin-small-top">
                                        <label for="create-is-assisted-yes">
                                            <input class="ap-checkbox" id="create-is-assisted-yes" type="radio"
                                                :value="1"
                                                v-model="form.is_assisted">
                                            <span class="ap-margin-small-left">
                                                Yes
                                            </span>
                                        </label>
                                    </div>
                                    <div class="ap-inline ap-margin-small-top ap-margin-left">
                                        <label for="create-is-assisted-no">
                                            <input class="ap-checkbox" id="create-is-assisted-no" type="radio"
                                                :value="0"
                                                v-model="form.is_assisted">
                                            <span class="ap-margin-small-left">
                                                No
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-input
                                        v-show="form.is_assisted"
                                        type="date"
                                        :readonly="isLoading('store')"
                                        :required="form.is_assisted"
                                        :label="'* Date Assisted'"
                                        v-model="form.assisted_date"
                                        :error="hasError('assisted_date') ? errors.assisted_date[0] : ''"/>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                    <ap-input
                                        v-show="form.is_assisted"
                                        type="text"
                                        :readonly="isLoading('store')"
                                        :required="form.assisted_by"
                                        :label="'* Assisted By'"
                                        :placeholder="'ex. JUAN DELA CRUZ'"
                                        v-model="form.assisted_by"
                                        :error="hasError('assisted_by') ? errors.assisted_by[0] : ''"/>
                                </div>
                            </ap-grid>

                            <ap-input
                                list="assistanceFromOptions"
                                type="text"
                                :readonly="isLoading('store')"
                                :label="'* Assistance From'"
                                :placeholder="'ex. CONGRESSMAN'"
                                v-model="form.assistance_from"
                                :error="hasError('assistance_from') ? errors.assistance_from[0] : ''"/>

                            <datalist id="assistanceFromOptions"
                                v-if="company.province_id == '0369'">
                                <option value="VY" />
                                <option value="SY" />
                                <option value="CY" />
                            </datalist>
                        </div>
                        
                    </fieldset>

                    <div class="ap-margin-top ap-text-right">
                        <ap-button
                            v-if="!isLoading('store')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('store')">
                            Submit
                        </ap-button>
                    </div>
                </form>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                assistance_date: '',
                assistance_type: '',
                assistance_amount: 0,
                remarks: '',
                is_assisted: 1,
                assisted_date: '',
                assisted_by: '',
                assistance_from: '',
            },
        };
    },

    created()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiaryAssistance/isLoading',
            beneficiary: 'companyBeneficiary/selected',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiaryAssistance/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/assistance`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Assistance has been added.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Form validation. Please double check your form.',
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
            this.form.assistance_date = Dater.rawToday();
            this.form.assistance_type = '';
            this.form.assistance_amount = 0;
            this.form.remarks = '';
            this.form.is_assisted = 1;
            this.form.assisted_date = Dater.rawToday();
            this.form.assisted_by = '';
            this.form.assistance_from = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('create', false);
        },
    },
};
</script>
