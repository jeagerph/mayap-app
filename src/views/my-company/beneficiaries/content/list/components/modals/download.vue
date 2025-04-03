<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Download Report
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

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                            <label class="ap-form-label ap-text-bold">
                                AGE
                            </label>

                            <select class="ap-select"
                                v-model="form.age">
                                <option :value="''">ANY</option>
                                <option :value="'1,15'">15 yrs old and below</option>
                                <option :value="'16,25'">16 - 25 yrs old</option>
                                <option :value="'26,35'">26 - 35 yrs old</option>
                                <option :value="'36,45'">36 - 45 yrs old</option>
                                <option :value="'46,59'">46 - 59 yrs old</option>
                                <option :value="'60,100'">60 yrs old and above</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                            <label class="ap-form-label ap-text-bold">
                                GENDER
                            </label>

                            <select class="ap-select"
                                v-model="form.gender">
                                <option :value="''">ANY</option>
                                <option :value="1">MALE</option>
                                <option :value="2">FEMALE</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                            <label class="ap-form-label ap-text-bold">
                                OFFICER
                            </label>

                            <select class="ap-select"
                                v-model="form.is_officer">
                                <option :value="''">ANY</option>
                                <option :value="1">YES</option>
                                <option :value="0">NO</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                            <label class="ap-form-label ap-text-bold">
                                HEAD OF HOUSEHOLD
                            </label>

                            <select class="ap-select"
                                v-model="form.is_household">
                                <option :value="''">ANY</option>
                                <option :value="1">YES</option>
                                <option :value="0">NO</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                            <label class="ap-form-label ap-text-bold">
                                VOTER TYPE
                            </label>

                            <select class="ap-select"
                                v-model="form.voter_type">
                                <option :value="''">ANY</option>
                                <option :value="2">COMMAND VOTES (CV)</option>
                                <option :value="3">SURE VOTES (SV)</option>
                                <option :value="4">SWING VOTES (SW)</option>
                                <option :value="5">BLOCK LISTED (BL)</option>
                                <option :value="1">OTHERS (OTH)</option>
                            </select>
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
                gender: '',
                is_officer: '',
                is_household: '',
                province_id: '',
                city_id: '',
                barangay_id: '',
                purok: '',
                street: '',
                zone: '',
                age: '',
                voter_type: ''
                
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

        downloadModal()
        {
            return this.$parent.$data.downloadModal;
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

            let url = `/my-company/beneficiaries/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;

            if (this.form.gender)
            {
                url += `&filter[gender]=${this.form.gender}`;
            }

            if (this.form.is_officer == 1)
            {
                url += `&filter[isOfficer]=1`;
            }
            else if (this.form.is_officer == 0)
            {
                url += `&filter[isOfficer]=0`;
            }

            if (this.form.is_household == 1)
            {
                url += `&filter[isHousehold]=1`;
            }
            else if (this.form.is_household == 0)
            {
                url += `&filter[isHousehold]=0`;
            }

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

            if (this.form.purok)
            {
                url += `&filter[purok]=${this.form.purok}`;
            }

            if (this.form.street)
            {
                url += `&filter[street]=${this.form.street}`;
            }

            if (this.form.zone)
            {
                url += `&filter[zone]=${this.form.zone}`;
            }

            if (this.form.age)
            {
                url += `&filter[age]=${this.form.age}`;
            }

            if (this.form.voter_type)
            {
                url += `&filter[voterType]=${this.form.voter_type}`;
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
            this.$parent.toggleModal('download', false);
        },
    },

    watch:
    {
        downloadModal(val)
        {
            if (val) this.loadCities();
        }
    }
};
</script>
