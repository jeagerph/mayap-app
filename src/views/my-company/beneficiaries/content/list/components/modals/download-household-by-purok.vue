<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadHouseholdByPurokModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Download Household By Purok/Sitio Report
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
                        <small class="ap-text-bold">
                            ADDRESS
                        </small>

                        <ap-grid :gutter="'small'"
                            class="ap-margin-top">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <label class="ap-text-bold ap-form-label">
                                    Province
                                </label>

                                <select class="ap-select"
                                    v-if="!isLoading('provinces')"
                                    v-model="form.province_id"
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
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <div class="ap-margin"
                                    v-if="form.province_id">
                                    <label class="ap-form-label ap-text-bold">
                                        City/Municipality
                                    </label>
                                    <select class="ap-select"
                                        v-if="!isLoading('cities')"
                                        v-model="form.city_id"
                                        @change="onSelectCity()">
                                        <option value="" selected>-- any city --</option>
                                        <option
                                            v-for="(item, index) in cities"
                                            :key="index"
                                            :value="item.city_code">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder v-else
                                        :size="'medium'"/>
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
                                        Barangay
                                    </label>
                                    <select class="ap-select"
                                        v-if="!isLoading('barangays')"
                                        v-model="form.barangay_id">
                                        <option value="" selected>-- any barangay --</option>
                                        <option
                                            v-for="(item, index) in barangays"
                                            :key="index"
                                            :value="item.id">
                                            {{item.name}}
                                        </option>
                                    </select>
                                    <ap-placeholder v-else
                                        :size="'medium'"/>
                                </div>
                                <ap-input
                                    v-else
                                    :label="'* Barangay'"
                                    :value="'Select a city/municipality first...'"
                                    :disabled="true" />
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-medium-top">
                        <label class="ap-text-bold" for="household-by-purok-include-list">
                            <input type="checkbox"
                                id="household-by-purok-include-list"
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
                province_id: '',
                city_id: '',
                barangay_id: '',
                include_list: 0,
                
            },

            downloadLoading: false,
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
            accessUser: 'auth/accessUser',
            provinces: 'companyBeneficiary/provinces',
            cities: 'companyBeneficiary/cities',
            barangays: 'companyBeneficiary/barangays',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        downloadHouseholdByPurokModal()
        {
            return this.$parent.$data.downloadHouseholdByPurokModal;
        }
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};

            let url = `/my-company/beneficiaries/household/by-purok/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;
                url += `&filter[isHousehold]=1`;
                url += `&includeList=${this.form.include_list}`;
            
            if (this.form.province_id)
            {
                url += `&filter[provCode]=${this.form.province_id}`;
            }

            if (this.form.city_id)
            {
                url += `&filter[cityCode]=${this.form.city_id}`;
            }

            if (this.form.barangay_id)
            {
                url += `&filter[barangay]=${this.form.barangay_id}`;
            }

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
            this.form.from = Dater.rawToday();
            this.form.to = Dater.rawToday();

            this.form.province_id = this.accessUser.company.province_id;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('downloadHouseholdByPurok', false);
        },
    },

    watch:
    {
        downloadHouseholdByPurokModal(val)
        {
            if (val) this.loadCities();
        }
    }
};
</script>
