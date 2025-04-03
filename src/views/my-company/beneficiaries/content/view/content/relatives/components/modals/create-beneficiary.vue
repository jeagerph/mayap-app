<template>
    <ap-modal
        :isOpen.sync="$parent.$parent.$data.createBeneficiaryModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Create Beneficiary
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="submitLoading"
                                    :label="'* First Name'"
                                    :placeholder="'ex. JUAN'"
                                    v-model="form.first_name"
                                    :error="hasError('first_name') ? errors.first_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="submitLoading"
                                    :label="'Middle Name'"
                                    :placeholder="'ex. SANTIAGO'"
                                    v-model="form.middle_name"
                                    :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="submitLoading"
                                    :label="'* Last Name'"
                                    :placeholder="'ex. DELA CRUZ SR.'"
                                    v-model="form.last_name"
                                    :error="hasError('last_name') ? errors.last_name[0] : ''"/>
                            </div>
                        </ap-grid>

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <label class="ap-text-bold ap-form-label"
                                    :class="{ 'ap-text-danger': hasError('gender')}">
                                    * Gender
                                </label>

                                <select
                                    class="ap-select"
                                    :required="true"
                                    v-model="form.gender"
                                    :readonly="submitLoading">
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
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="date"
                                    :required="true"
                                    :readonly="submitLoading"
                                    :label="'* Date of Birth'"
                                    :placeholder="'ex. Olongapo City'"
                                    v-model="form.date_of_birth"
                                    :error="hasError('date_of_birth') ? errors.date_of_birth[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    class="ap-margin-xsmall-bottom"
                                    type="number"
                                    :readonly="submitLoading"
                                    :required="true"
                                    :label="'* Mobile No.'"
                                    :placeholder="'ex. 09XX XXXX XXXX'"
                                    v-model="form.mobile_no"
                                    :error="hasError('mobile_no') ? errors.mobile_no[0] : ''"/>
                                <small class="ap-text-italic">
                                    <i class="lni lni-flag"></i> Mobile number allowed format (09227503074)
                                </small>
                            </div>
                        </ap-grid>

                        <p class="ap-text-primary ap-text-bold">
                            ADDRESS
                        </p>

                        <ap-grid
                            :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                <div class="ap-margin">
                                    <label class="ap-text-bold ap-form-label"
                                        :class="{ 'ap-text-danger': hasError('province_id')}">
                                        * Province
                                    </label>

                                    <select class="ap-select"
                                        v-if="!isLoading('provinces')"
                                        v-model="form.province_id"
                                        :readonly="isLoading('store')"
                                        :required="true"
                                        @change="onSelectProvince()">
                                        <option :value="''" disabled>-- select province --</option>
                                        <option v-for="(item, index) in provinces"
                                            :key="index"
                                            :value="item.prov_code">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder
                                        v-else
                                        :size="'medium'" />

                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('province_id')">
                                        <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                                        {{errors.province_id[0]}}
                                    </small>
                                </div>
                            </div>

                            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                <div class="ap-margin"
                                    v-if="form.province_id">
                                    <label class="ap-form-label ap-text-bold">
                                        * City/Municipality
                                    </label>
                                    <select class="ap-select"
                                        v-if="!isLoading('cities')"
                                        v-model="form.city_id"
                                        :required="true"
                                        @change="onSelectCity()">
                                        <option value="" selected disabled>-- select city --</option>
                                        <option
                                            v-for="(item, index) in cities"
                                            :key="index"
                                            :value="item.city_code">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder v-else
                                        :size="'medium'"/>

                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('city_id')">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        {{errors.city_id[0]}}
                                    </small>
                                </div>
                                <ap-input
                                    v-else
                                    :label="'* City/Municipality'"
                                    :value="'Select a province first...'"
                                    :disabled="true" />
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                <div
                                    v-if="form.city_id">
                                    <label class="ap-form-label ap-text-bold">
                                        * Barangay
                                    </label>
                                    <select class="ap-select"
                                        v-if="!isLoading('barangays')"
                                        :required="true"
                                        v-model="form.barangay_id">
                                        <option value="" selected disabled>-- select barangay --</option>
                                        <option
                                            v-for="(item, index) in barangays"
                                            :key="index"
                                            :value="item.id">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder v-else
                                        :size="'medium'"/>

                                    <small class="ap-text-bold ap-text-danger"
                                        v-if="hasError('barangay_id')">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        {{errors.barangay_id[0]}}
                                    </small>
                                </div>
                                <ap-input
                                    v-else
                                    :label="'* Barangay'"
                                    :value="'Select a city/municipality first...'"
                                    :disabled="true" />
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                <ap-input
                                    type="text"
                                    :readonly="isLoading('store')"
                                    :label="'House No.'"
                                    :placeholder="'ex. #107'"
                                    v-model="form.house_no"
                                    :error="hasError('house_no') ? errors.house_no[0] : ''"/>
                            </div>
                        </ap-grid>
                    </fieldset>

                    <div class="ap-margin ap-text-right">
                        <ap-button
                            v-if="!submitLoading"
                            type="button"
                            class="ap-margin-small-right"
                            @click="closeModal()">
                            Cancel
                        </ap-button>
                        <ap-button
                            type="submit"
                            :color="'primary'"
                            :outline="false"
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

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                beneficiary_validation: true,
                date_registered: '',

                province_id: '',
                city_id: '',
                barangay_id: '',
                house_no: '',

                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                mobile_no: '',
                email: '',

                place_of_birth: '',
                date_of_birth: '',
                civil_status: '',
                citizenship: '',
                religion: '',

                educational_attainment: '',
                occupation: '',
                monthly_income: '',
                source_of_income: '',
                classification: '',

                is_household: 0,
                household_count: 0,
                is_priority: 0,

                health_issues: '',
                problem_presented: '',
                findings: '',
                assessment_recommendation: '',
                needs: '',
                remarks: '',

                emergency_contact_name: '',
                emergency_contact_address: '',
                emergency_contact_no: '',

                questionnaires: [],

                photo: '',

                latitude: 0,
                longitude: 0,
            },

            submitLoading: false,
        };
    },

    created()
    {
        this.initialize();

        this.loadProvinces();
    },

    computed:
    {
        ...mapGetters({
            beneficiary: 'companyBeneficiary/selected',
            provinces: 'companyBeneficiary/provinces',
            cities: 'companyBeneficiary/cities',
            barangays: 'companyBeneficiary/barangays',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        createForm()
        {
            return this.$parent.$parent.$data.form;
        },
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite'
        }),
        
        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.post(
                `/my-company/beneficiary/option`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 201)
            {
                this.createForm.relativeCode = response.data.slug.code;
                this.$parent.$parent.$data.relative = response.data;

                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Beneficiary has been added.'
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

        async loadProvinces()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/provinces`,
                action: 'provinces'
            });

            this.form.city_id = '';
            this.form.barangay_id = '';
        },

        async loadCities()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/cities?filter[provCode]=${this.form.province_id}`,
                action: 'cities'
            });

            this.form.barangay_id = '';
        },

        async loadBarangays()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/barangays?filter[cityCode]=${this.form.city_id}`,
                action: 'barangays'
            });
        },

        onSelectProvince()
        {
            this.loadCities();

            this.form.city_id = '';
            this.form.barangay_id = '';
        },

        onSelectCity()
        {
            this.loadBarangays();

            this.form.barangay_id = '';
        },

        initialize()
        {
            this.form.date_registered = Dater.rawToday();
            this.form.province_id = '';
            this.form.city_id = '';
            this.form.barangay_id = '';
            this.form.house_no = '';
            this.form.first_name = '';
            this.form.middle_name = '';
            this.form.last_name = '';
            this.form.gender = '';
            this.form.mobile_no = '';
            this.form.email = '';

            this.form.province_id = '';
            this.form.city_id = '';
            this.form.barangay_id = '';
            this.form.house_no = '';
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.$parent.toggleModal('createBeneficiary', false);
        },
    },
};
</script>
