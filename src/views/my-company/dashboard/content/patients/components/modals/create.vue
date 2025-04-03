<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Add Patient to <span class="ap-text-bold">{{ beneficiary.full_name }}</span>
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="date"
                            :readonly="isLoading('store')"
                            :label="'* Patient Date'"
                            v-model="form.patient_date"
                            :error="hasError('patient_date') ? errors.patient_date[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'* First Name'"
                                    :required="true"
                                    :placeholder="'ex. JUAN'"
                                    v-model="form.first_name"
                                    :error="hasError('first_name') ? errors.first_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'Middle Name'"
                                    :placeholder="'ex. SANTIAGO'"
                                    v-model="form.middle_name"
                                    :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'* Last Name'"
                                    :required="true"
                                    :placeholder="'ex. DELA CRUZ'"
                                    v-model="form.last_name"
                                    :error="hasError('last_name') ? errors.last_name[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-input
                            type="text"
                            :readonly="isLoading('store')"
                            :label="'* Relation to Patient'"
                            :required="true"
                            :placeholder="'ex. PARENT'"
                            v-model="form.relation_to_patient"
                            :error="hasError('relation_to_patient') ? errors.relation_to_patient[0] : ''"/>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Problem Presented
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="3"
                                :readonly="isLoading('store')"
                                :placeholder="'type here...'"
                                v-model="form.problem_presented">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('problem_presented')">
                                    {{errors.problem_presented[0]}}
                            </small>
                        </div>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Findings
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="3"
                                :readonly="isLoading('store')"
                                :placeholder="'type here...'"
                                v-model="form.findings">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('findings')">
                                    {{errors.findings[0]}}
                            </small>
                        </div>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Assessment & Recommendation
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="3"
                                :readonly="isLoading('store')"
                                :placeholder="'type here...'"
                                v-model="form.assessment_recommendation">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('assessment_recommendation')">
                                    {{errors.assessment_recommendation[0]}}
                            </small>
                        </div>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                Needs Given
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="3"
                                :readonly="isLoading('store')"
                                :placeholder="'type here...'"
                                v-model="form.needs">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('needs')">
                                    {{errors.needs[0]}}
                            </small>
                        </div>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                * Other Remarks
                            </label>

                            <textarea
                                class="ap-textarea ap-textarea-message"
                                cols="30"
                                rows="3"
                                :readonly="isLoading('store')"
                                :placeholder="'any remarks here...'"
                                v-model="form.remarks">
                            </textarea>

                            <small class="ap-text-bold ap-text-danger"
                                v-if="hasError('remarks')">
                                    {{errors.remarks[0]}}
                            </small>
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
                patient_date: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                relation_to_patient: '',
                problem_presented: '',
                findings: '',
                assessment_recommendation: '',
                needs: '',
                remarks: '',
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
            isLoading: 'companyBeneficiaryPatient/isLoading',
            beneficiary: 'companyBeneficiary/selected',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiaryPatient/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/patient`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Patient has been added.'
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
            this.form.patient_date = Dater.rawToday();
            this.form.first_name = '';
            this.form.middle_name = '';
            this.form.last_name = '';
            this.form.relation_to_patient = '';
            this.form.problem_presented = '';
            this.form.findings = '';
            this.form.assessment_recommendation = '';
            this.form.needs = '';
            this.form.remarks = '';
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
