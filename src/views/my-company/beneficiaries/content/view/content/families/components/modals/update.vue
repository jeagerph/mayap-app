<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Add Family/Relative to <span class="ap-text-bold">{{ beneficiary.full_name }}</span>
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-input
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'* Full Name'"
                            :required="true"
                            :placeholder="'ex. JUAN DELA CRUZ'"
                            v-model="form.full_name"
                            :error="hasError('full_name') ? errors.full_name[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <div>
                                    <label class="ap-text-bold ap-form-label"
                                        :class="{ 'ap-text-danger': hasError('gender')}">
                                        * Gender
                                    </label>

                                    <select
                                        class="ap-select"
                                        :required="true"
                                        v-model="form.gender"
                                        :readonly="isLoading('update')">
                                        <option :value="''" disabled>-- select gender --</option>
                                        <option :value="1">MALE</option>
                                        <option :value="2">FEMALE</option>
                                    </select>

                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('gender')">
                                        <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                        {{errors.gender[0]}}
                                    </small>
                                </div>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="date"
                                    required="true"
                                    :readonly="isLoading('update')"
                                    :label="'* Date of Birth'"
                                    v-model="form.date_of_birth"
                                    :error="hasError('date_of_birth') ? errors.date_of_birth[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-input
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'* Address'"
                            :required="true"
                            :placeholder="'ex. ADDRESS'"
                            v-model="form.address"
                            :error="hasError('address') ? errors.address[0] : ''"/>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('update')"
                                    :label="'Education'"
                                    :placeholder="'ex. HIGH SCHOOL GRAD'"
                                    v-model="form.education"
                                    :error="hasError('education') ? errors.education[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('update')"
                                    :label="'Occupation'"
                                    :placeholder="'ex. SOFTWARE DEVELOPER'"
                                    v-model="form.occupation"
                                    :error="hasError('occupation') ? errors.occupation[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-input
                            list="relationshipOptions"
                            type="text"
                            :readonly="isLoading('update')"
                            :label="'* Relation'"
                            :required="true"
                            :placeholder="'ex. FATHER'"
                            v-model="form.relationship"
                            :error="hasError('relationship') ? errors.relationship[0] : ''"/>

                        <datalist id="relationshipOptions">
                            <option value="GRANDFATHER" />
                            <option value="GRANDMOTHER" />
                            <option value="FATHER" />
                            <option value="MOTHER" />
                            <option value="UNCLE" />
                            <option value="AUNT" />
                            <option value="HUSBAND" />
                            <option value="WIFE" />
                            <option value="SON" />
                            <option value="DAUGHTER" />
                            <option value="SIBLING" />
                            <option value="GRANDSON" />
                            <option value="GRANDDAUGHTER" />
                            <option value="NEPHEW" />
                            <option value="NIECE" />
                            <option value="COUSIN" />
                            <option value="LIVE-IN PARTNER" />
                            <option value="STEPFATHER" />
                            <option value="STEPMOTHER" />
                            <option value="STEPSON" />
                            <option value="STEPDAUGHTER" />
                        </datalist>
                    </fieldset>

                    <div class="ap-margin-top ap-text-right">
                        <ap-button
                            v-if="!isLoading('update')"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
                            :loading="isLoading('update')">
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
                full_name: '',
                gender: '',
                date_of_birth: '',
                address: '',
                education: '',
                occupation: '',
                relationship: '',
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
            isLoading: 'companyBeneficiaryFamily/isLoading',
            beneficiary: 'companyBeneficiary/selected',
            family: 'companyBeneficiaryFamily/selected',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'companyBeneficiaryFamily/update',
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.update({
                url: `/my-company/beneficiary/${this.beneficiary.slug.code}/family/${this.family.id}`,
                form: this.form,
            });

            if (response.status === 200)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Family/relative has been updated.'
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
            this.form.full_name = this.family.full_name;
            this.form.gender = this.family.gender.id;
            this.form.date_of_birth = this.family.date_of_birth;
            this.form.address = this.family.address;
            this.form.education = this.family.education;
            this.form.occupation = this.family.occupation;
            this.form.relationship = this.family.relationship;
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
};
</script>
