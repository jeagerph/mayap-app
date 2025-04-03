<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadByPurokModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Download Patient By Purok/Sitio Report
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <p class="ap-text-bold ap-text-italic">
                    Fill-out the form to filter data
                </p>

                <div class="ap-form-stacked">
                    <small class="ap-text-bold">
                        DATE
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

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <label class="ap-form-label ap-text-bold">
                                STATUS
                            </label>

                            <select class="ap-select"
                                v-model="form.status">
                                <option :value="''">ANY</option>
                                <option :value="1">FOR APPROVAL</option>
                                <option :value="2">IN PROGRESS</option>
                                <option :value="3">COMPLETED</option>
                                <option :value="4">CANCELED</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'PROBLEM PRESENTED'"
                                :placeholder="'any keyword'"
                                v-model="form.problem_presented"
                                :error="hasError('problem_presented') ? errors.problem_presented[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'FINDINGS'"
                                :placeholder="'any keyword'"
                                v-model="form.findings"
                                :error="hasError('findings') ? errors.findings[0] : ''"/>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'ASSESSMENT & RECOMMENDATION'"
                                :placeholder="'any keyword'"
                                v-model="form.assessment_recommendation"
                                :error="hasError('assessment_recommendation') ? errors.assessment_recommendation[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'NEEDS'"
                                :placeholder="'any keyword'"
                                v-model="form.needs"
                                :error="hasError('needs') ? errors.needs[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'REMARKS'"
                                :placeholder="'any keyword'"
                                v-model="form.remarks"
                                :error="hasError('remarks') ? errors.remarks[0] : ''"/>
                        </div>
                    </ap-grid>

                    <div class="ap-margin-medium-top">
                        <small class="ap-text-bold">
                            BENEFICIARY
                        </small>
                    </div>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'First Name'"
                                :placeholder="'ex. JUAN'"
                                v-model="form.first_name"
                                :error="hasError('first_name') ? errors.first_name[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'Middle Name'"
                                :placeholder="'ex. SANTIAGO'"
                                v-model="form.middle_name"
                                :error="hasError('middle_name') ? errors.middle_name[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'Last Name'"
                                :placeholder="'ex. DELA CRUZ'"
                                v-model="form.last_name"
                                :error="hasError('last_name') ? errors.last_name[0] : ''"/>
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
                                    <option :value="''">-- any --</option>
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
                                        <option value="" selected>-- any --</option>
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
                                        <option value="" selected>-- any --</option>
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

                        <ap-grid :gutter="'small'">
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="downloadLoading"
                                    :label="'Purok/Sitio'"
                                    :placeholder="'ex. PUROK/SITIO'"
                                    v-model="form.purok"
                                    :error="hasError('purok') ? errors.purok[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="downloadLoading"
                                    :label="'Street'"
                                    :placeholder="'ex. STREET'"
                                    v-model="form.street"
                                    :error="hasError('street') ? errors.street[0] : ''"/>
                            </div>
                            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                <ap-input
                                    type="text"
                                    :readonly="downloadLoading"
                                    :label="'Zone'"
                                    :placeholder="'ex. ZONE'"
                                    v-model="form.zone"
                                    :error="hasError('zone') ? errors.zone[0] : ''"/>
                            </div>
                        </ap-grid>
                    </div>

                    <div class="ap-margin-medium-top">
                        <label class="ap-text-bold" for="by-purok-include-list">
                            <input type="checkbox"
                                id="by-purok-include-list"
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
                first_name: '',
                middle_name: '',
                last_name: '',
                problem_presented: '',
                findings: '',
                assessment_recommendation: '',
                needs: '',
                remarks: '',
                status: '',
                relation_to_patient: '',

                benef_first_name: '',
                benef_middle_name: '',
                benef_last_name: '',
                province_id: '',
                city_id: '',
                barangay_id: '',
                purok: '',
                street: '',
                zone: '',

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
            provinces: 'companyPatient/provinces',
            cities: 'companyPatient/cities',
            barangays: 'companyPatient/barangays',
            isLoading: 'companyPatient/isLoading',
        }),

        downloadByPurokModal()
        {
            return this.$parent.$data.downloadByPurokModal;
        }
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyPatient/loadPrerequisite',
        }),


        async submit()
        {
            this.errors = {};

            let url = `/my-company/patients/by-purok/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;
                url += `&includeList=${this.form.include_list}`;

                if (this.form.first_name)
            {
                url += `&filter[firstName]=${this.form.first_name}`;
            }

            if (this.form.middle_name)
            {
                url += `&filter[middleName]=${this.form.middle_name}`;
            }

            if (this.form.last_name)
            {
                url += `&filter[lastName]=${this.form.last_name}`;
            }

            if (this.form.problem_presented)
            {
                url += `&filter[problemPresented]=${this.form.problem_presented}`;
            }

            if (this.form.findings)
            {
                url += `&filter[findings]=${this.form.findings}`;
            }

            if (this.form.assessment_recommendation)
            {
                url += `&filter[assessmentRecommendation]=${this.form.assessment_recommendation}`;
            }

            if (this.form.needs)
            {
                url += `&filter[needs]=${this.form.needs}`;
            }

            if (this.form.remarks)
            {
                url += `&filter[remarks]=${this.form.remarks}`;
            }

            if (this.form.status)
            {
                url += `&filter[status]=${this.form.status}`;
            }

            if (this.form.relation_to_patient)
            {
                url += `&filter[relationToPatient]=${this.form.relation_to_patient}`;
            }

            if (this.form.benef_first_name)
            {
                url += `&filter[benefFirstName]=${this.form.benef_first_name}`;
            }

            if (this.form.benef_middle_name)
            {
                url += `&filter[benefMiddleName]=${this.form.benef_middle_name}`;
            }

            if (this.form.benef_last_name)
            {
                url += `&filter[benefLastName]=${this.form.benef_last_name}`;
            }

            if (this.form.province_id)
            {
                url += `&filter[benefProvCode]=${this.form.province_id}`;
            }

            if (this.form.city_id)
            {
                url += `&filter[benefCityCode]=${this.form.city_id}`;
            }

            if (this.form.barangay_id)
            {
                url += `&filter[benefBarangay]=${this.form.barangay_id}`;
            }

            if (this.form.purok)
            {
                url += `&filter[benefPurok]=${this.form.purok}`;
            }

            if (this.form.street)
            {
                url += `&filter[benefStreet]=${this.form.street}`;
            }

            if (this.form.zone)
            {
                url += `&filter[benefZone]=${this.form.zone}`;
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
                url: `/my-company/assistance/provinces`,
                action: 'provinces'
            });

            this.form.city_id = '';
            this.form.barangay_id = '';
        },

        async loadCities()
        {
            this.loadPrerequisite({
                url: `/my-company/assistance/cities?filter[provCode]=${this.form.province_id}`,
                action: 'cities'
            });

            this.form.barangay_id = '';
        },

        async loadBarangays()
        {
            this.loadPrerequisite({
                url: `/my-company/assistance/barangays?filter[cityCode]=${this.form.city_id}`,
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
            this.$parent.toggleModal('downloadByPurok', false);
        },
    },

    watch:
    {
        downloadByPurokModal(val)
        {
            if (val)
            {
                this.loadCities();
            }
        }
    }
};
</script>
