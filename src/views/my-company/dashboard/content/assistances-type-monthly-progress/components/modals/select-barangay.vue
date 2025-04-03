<template>
    <ap-modal
        :isOpen.sync="$parent.$data.selectBarangayModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Select Barangay
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <p class="ap-text-bold ap-text-italic">
                    Fill-out the form to filter data
                </p>

                <div class="ap-form-stacked">

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

                    <div class="ap-margin ap-text-right">
                        <ap-button
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
                            :rounded="true">
                            Submit
                        </ap-button>
                    </div>
                </div>
                
                
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form } from '@/utils';

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
            accessUser: 'auth/accessUser',
            provinces: 'companyDashboard/provinces',
            cities: 'companyDashboard/cities',
            barangays: 'companyDashboard/barangays',
            isLoading: 'companyDashboard/isLoading',
        }),

        selectBarangayModal()
        {
            return this.$parent.$data.selectBarangayModal;
        }
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyDashboard/loadPrerequisite',
        }),

        async submit()
        {
            this.$parent.$data.form.barangay = this.form.barangay_id;

            if (this.form.barangay_id)
            {
                let checking = this.barangays.find(row => row.id == this.form.barangay_id);

                if (checking)
                {
                    this.$parent.$data.barangay = checking;
                }
            }
            else
            {
                this.$parent.$data.barangay = {};
            }
            
            this.$parent.load();

            this.closeModal();
        },

        async loadProvinces()
        {
            this.loadPrerequisite({
                url: `/my-company/dashboard/provinces`,
                action: 'provinces'
            });

            this.form.city_id = '';
            this.form.barangay_id = '';
        },

        async loadCities()
        {
            if (this.cities.length) return false;
            
            this.loadPrerequisite({
                url: `/my-company/dashboard/cities?filter[provCode]=${this.form.province_id}`,
                action: 'cities'
            });

            this.form.barangay_id = '';
        },

        async loadBarangays()
        {
            this.loadPrerequisite({
                url: `/my-company/dashboard/barangays?filter[cityCode]=${this.form.city_id}`,
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
            this.form.province_id = this.accessUser.company.province_id;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('selectBarangay', false);
        },
    },

    watch:
    {
        selectBarangayModal(val)
        {
            if (val)
            {
                this.loadCities();
            }
        }
    }
};
</script>
