<template>
    <ap-modal
        :isOpen.sync="$parent.$data.downloadAssistanceModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Download Assistance Report
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <p class="ap-text-bold ap-text-italic">
                    Fill-out the form to filter data
                </p>

                <div class="ap-form-stacked">
                    <small class="ap-text-bold">
                        DATE OF ASSISTANCE
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
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <label class="ap-form-label ap-text-bold">
                                ASSISTED
                            </label>

                            <select class="ap-select"
                                v-model="form.is_assisted">
                                <option :value="''">ANY</option>
                                <option :value="1">YES</option>
                                <option :value="0">NO</option>
                            </select>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'TYPE OF ASSISTANCE'"
                                :placeholder="'ex. CASH AID'"
                                v-model="form.assistance_type"
                                :error="hasError('assistance_type') ? errors.assistance_type[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'ASSISTED BY'"
                                :placeholder="'ex. STAFF'"
                                v-model="form.assisted_by"
                                :error="hasError('assisted_by') ? errors.assisted_by[0] : ''"/>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                            <ap-input
                                type="text"
                                :readonly="downloadLoading"
                                :label="'ASSISTANCE FROM'"
                                :placeholder="'ex. CONGRESSMAN'"
                                v-model="form.assistance_from"
                                :error="hasError('assistance_from') ? errors.assistance_from[0] : ''"/>
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
                province_id: '',
                city_id: '',
                barangay_id: '',
                purok: '',
                street: '',
                zone: '',
                assistance_type: '',
                is_assisted: '',
                assisted_by: '',
                assistance_from: '',
                
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
            provinces: 'companyAssistance/provinces',
            cities: 'companyAssistance/cities',
            barangays: 'companyAssistance/barangays',
            isLoading: 'companyAssistance/isLoading',
        }),

        downloadAssistanceModal()
        {
            return this.$parent.$data.downloadAssistanceModal;
        }
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyAssistance/loadPrerequisite',
        }),

        async submit()
        {
            this.errors = {};

            let url = `/my-company/assistances/download?ctx`;

                url += `&from=${this.form.from}`;
                url += `&to=${this.form.to}`;

            if (this.form.assistance_type)
            {
                url += `&filter[assistanceType]=${this.form.assistance_type}`;
            }

            if (this.form.is_assisted == 1)
            {
                url += `&filter[isAssisted]=1`;
            }
            else if (this.form.is_assisted != '' && this.form.is_assisted == 0)
            {
                url += `&filter[isAssisted]=0`;
            }

            if (this.form.assisted_by)
            {
                url += `&filter[assistedBy]=${this.form.assisted_by}`;
            }

            if (this.form.assistance_from)
            {
                url += `&filter[assistanceFrom]=${this.form.assistance_from}`;
            }

            if (this.form.first_name)
            {
                url += `&filter[benefFirstName]=${this.form.first_name}`;
            }

            if (this.form.middle_name)
            {
                url += `&filter[benefMiddleName]=${this.form.middle_name}`;
            }

            if (this.form.last_name)
            {
                url += `&filter[benefLastName]=${this.form.last_name}`;
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
            this.$parent.toggleModal('download', false);
        },
    },

    watch:
    {
        downloadAssistanceModal(val)
        {
            if (val)
            {
                this.loadCities();
            }
        }
    }
};
</script>
