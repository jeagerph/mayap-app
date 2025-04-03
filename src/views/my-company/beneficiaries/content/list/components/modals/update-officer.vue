<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateOfficerModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Update Officer/Leader
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <label class="ap-form-label ap-text-bold">
                                    Is Officer/Leader?
                                </label>

                                <div class="ap-inline ap-margin-small-top">
                                    <label for="is-officer-yes">
                                        <input class="ap-checkbox" id="is-officer-yes" type="radio"
                                            :value="1"
                                            v-model="form.is_officer">
                                        <span class="ap-margin-small-left">
                                            Yes
                                        </span>
                                    </label>
                                </div>
                                <div class="ap-inline ap-margin-small-top ap-margin-left">
                                    <label for="is-officer-no">
                                        <input class="ap-checkbox" id="is-officer-no" type="radio"
                                            :value="0"
                                            v-model="form.is_officer">
                                        <span class="ap-margin-small-left">
                                            No
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    list="officerClassificationOptions"
                                    type="text"
                                    :readonly="submitLoading"
                                    :label="'Officer/Leader Classification'"
                                    :placeholder="'ex. OFFICER/LEADER'"
                                    v-model="form.officer_classification"
                                    :error="hasError('officer_classification') ? errors.officer_classification[0] : ''"/>

                                <datalist id="officerClassificationOptions"
                                    v-if="!isLoading('officerClassifications')">
                                    <option
                                        v-for="(item, index) in officerClassifications"
                                        :key="index"
                                        :value="item.name"
                                        />
                                </datalist>
                            </div>
                        </ap-grid>
                            
                    </fieldset>

                    <div class="ap-margin-top ap-text-right">
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
                is_officer: '',
                officer_classification: '',
            },

            submitLoading: false,
        };
    },

    created()
    {
        this.initialize();

        this.loadClassifications();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            officerClassifications: 'companyBeneficiary/officerClassifications',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        updateOfficerModal()
        {
            return this.$parent.$data.updateOfficerModal;
        }
    },

    methods:
    {
        ...mapActions({
            update: 'companyBeneficiary/update',
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};
            
            this.submitLoading = true;

            const response = await Http.put(
                `/my-company/beneficiary/${this.beneficiary.slug.code}/officer`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.beneficiary.is_officer = response.data.is_officer;
                this.beneficiary.officer_classification = response.data.officer_classification;

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

        async loadClassifications()
        {
            if (this.officerClassifications.length > 0) return false;

            this.loadPrerequisite({
                url: `/my-company/beneficiary/officer-classification/options`,
                action: 'officerClassifications'
            });
        },

        initialize()
        {
            this.form.is_officer = this.beneficiary.is_officer;
            this.form.officer_classification = this.beneficiary.officer_classification;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('updateOfficer', false);
        },
    },

    watch:
    {
        updateOfficerModal(val)
        {
            if (val)
            {
                this.initialize();

                this.loadClassifications();
            }
        }
    }
};
</script>
