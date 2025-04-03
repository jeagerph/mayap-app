<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Add Incentive to <span class="ap-text-bold">{{ beneficiary.full_name }}</span>
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="date"
                            :readonly="isLoading('store')"
                            :label="'* Incentive Date'"
                            v-model="form.incentive_date"
                            :error="hasError('incentive_date') ? errors.incentive_date[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <label class="ap-text-bold ap-form-label"
                                    :class="{ 'ap-text-danger': hasError('mode')}">
                                    * Mode
                                </label>

                                <select
                                    class="ap-select"
                                    :required="true"
                                    v-model="form.mode"
                                    :readonly="isLoading('store')">
                                    <option :value="''" disabled>-- select mode --</option>
                                    <option :value="1">REPLENISH (ADD)</option>
                                    <option :value="2">WITHDRAW (DEDUCT)</option>
                                </select>

                                <small class="ap-text-bold ap-text-danger"
                                    v-if="hasError('mode')">
                                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                    {{errors.mode[0]}}
                                </small>
                            </div>
                            <div class="ap-width-1-1@s ap-width-2-3@m ap-width-2-3@l">
                                <ap-input
                                    type="number"
                                    :readonly="isLoading('store')"
                                    :label="'* Points'"
                                    :required="true"
                                    v-model="form.points"
                                    :error="hasError('points') ? errors.points[0] : ''"/>
                            </div>
                        </ap-grid>

                        <div class="ap-margin-top">
                            <label class="ap-text-bold ap-form-label">
                                * Remarks
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
                incentive_date: '',
                points: 0,
                mode: '',
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
            isLoading: 'companyBeneficiaryIncentive/isLoading',
            beneficiary: 'companyBeneficiary/selected',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'companyBeneficiaryIncentive/store',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/incentive`,
                form: this.form,
            });

            if (response.status === 201)
            {
                let currentIncentive = parseFloat(this.beneficiary.incentive);

                if (response.data.mode.id == 1)
                {
                    currentIncentive += parseFloat(response.data.points);
                }
                else
                {
                    currentIncentive -= parseFloat(response.data.points);
                }

                this.beneficiary.incentive = currentIncentive;

                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Incentive has been added.'
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
            this.form.incentive_date = Dater.rawToday();
            this.form.points = 0;
            this.form.mode = 1;
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
