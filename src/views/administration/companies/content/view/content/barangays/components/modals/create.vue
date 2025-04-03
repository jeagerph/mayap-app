<template>
    <ap-modal
        :isOpen.sync="$parent.$data.createModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Create Company Barangay
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <form class="ap-form-stacked"
                    @submit.prevent="submit()">
                    <fieldset class="ap-fieldset">

                        <ap-grid
                            :gutter="'small'"
                            class="ap-margin-top">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <div class="ap-margin">
                                    <label class="ap-text-bold ap-form-label"
                                        :class="{ 'ap-text-danger': hasError('province_id')}">
                                        * Province
                                    </label>

                                    <select class="ap-select"
                                        v-if="!companyLoading('provinces')"
                                        v-model="form.province_id"
                                        :readonly="isLoading('store')"
                                        :required="true"
                                        @change="onSelectProvince">
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

                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <div class="ap-margin"
                                    v-if="form.province_id">
                                    <label class="ap-form-label ap-text-bold">
                                        * City/Municipality
                                    </label>
                                    <select class="ap-select"
                                        v-if="!companyLoading('cities')"
                                        v-model="form.city_id"
                                        :required="true"
                                        @change="onSelectCity">
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
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <div
                                    v-if="form.city_id">
                                    <label class="ap-form-label ap-text-bold">
                                        * Barangay
                                    </label>
                                    <select class="ap-select"
                                        v-if="!companyLoading('barangays')"
                                        :required="true"
                                        v-model="form.barangay_id"
                                        @change="onSelectBarangay">
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
                        </ap-grid>


                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* Province Name'"
                                    :placeholder="'ex. ZAMBALES'"
                                    v-model="form.province_name"
                                    :error="hasError('province_name') ? errors.province_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* City Name'"
                                    :placeholder="'ex. OLONGAPO CITY'"
                                    v-model="form.city_name"
                                    :error="hasError('city_name') ? errors.city_name[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :required="true"
                                    :readonly="isLoading('store')"
                                    :label="'* Barangay Name'"
                                    :placeholder="'ex. STA RITA'"
                                    v-model="form.barangay_name"
                                    :error="hasError('barangay_name') ? errors.barangay_name[0] : ''"/>
                            </div>
                        </ap-grid>

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

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            form:
            {
                province_id: '',
                city_id: '',
                barangay_id: '',

                province_name: '',
                city_name: '',
                barangay_name: ''
            },
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
            provinces: 'adminCompany/provinces',
            cities: 'adminCompany/cities',
            barangays: 'adminCompany/barangays',
            companyLoading: 'adminCompany/isLoading',
            isLoading: 'adminCompanyBarangay/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            store: 'adminCompanyBarangay/store',
            loadPrerequisite: 'adminCompany/loadPrerequisite'
        }),

        async submit()
        {
            this.errors = {};
            
            const response = await this.store({
                url: `/administration/company/${this.$route.params.code}/barangay`,
                form: this.form,
            });

            if (response.status === 201)
            {
                this.initialize();

                this.closeModal();

                Toast.success({
                    message: 'Barangay has been created.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.'
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
                url: `/administration/company/provinces`,
                action: 'provinces'
            });

            this.form.city_id = '';
            this.form.barangay_id = '';
        },

        async loadCities()
        {
            this.loadPrerequisite({
                url: `/administration/company/cities?filter[provCode]=${this.form.province_id}`,
                action: 'cities'
            });

            this.form.barangay_id = '';
        },

        async loadBarangays()
        {
            this.loadPrerequisite({
                url: `/administration/company/barangays?filter[cityCode]=${this.form.city_id}`,
                action: 'barangays'
            });
        },

        onSelectProvince(event)
        {
            this.loadCities();

            this.form.city_id = '';
            this.form.city_name = '';

            this.form.barangay_id = '';
            this.form.barangay_name = '';

            let value = event.target.value;

            let province = this.provinces.find(row => row.prov_code == value);

            this.form.province_name = province.name;
        },

        onSelectCity(event)
        {
            this.loadBarangays();

            this.form.barangay_id = '';
            this.form.barangay_name = '';

            let value = event.target.value;

            let city = this.cities.find(row => row.city_code == value);

            this.form.city_name = city.name;
        },

        onSelectBarangay(event)
        {
            let value = event.target.value;

            let barangay = this.barangays.find(row => row.id == value);

            this.form.barangay_name = barangay.name;
        },

        initialize()
        {
            this.form.province_id = '';
            this.form.city_id = '';
            this.form.barangay_id = '';

            this.form.province_name = '';
            this.form.city_name = '';
            this.form.barangay_name = '';
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
