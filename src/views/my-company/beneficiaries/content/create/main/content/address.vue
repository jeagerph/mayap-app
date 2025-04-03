<template>
    <div class="ap-margin-small-top">

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

            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
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
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
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
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'House No.'"
                    :placeholder="'ex. #107'"
                    v-model="form.house_no"
                    :error="hasError('house_no') ? errors.house_no[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Lot/Blk/Phase/Zone'"
                    :placeholder="'ex. LOT'"
                    v-model="form.zone"
                    :error="hasError('zone') ? errors.zone[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Street'"
                    :placeholder="'ex. STREET'"
                    v-model="form.street"
                    :error="hasError('street') ? errors.street[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Sitio/Purok'"
                    :placeholder="'ex. SITIO/PUROK'"
                    v-model="form.purok"
                    :error="hasError('purok') ? errors.purok[0] : ''"/>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Nearest Landmark'"
                    :placeholder="'ex. LANDMARK'"
                    v-model="form.landmark"
                    :error="hasError('landmark') ? errors.landmark[0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    list="houseOwnershipOptions"
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'House Ownership'"
                    :placeholder="'ex. OWNED'"
                    v-model="form.house_ownership"
                    :error="hasError('house_ownership') ? errors.house_ownership[0] : ''"/>

                <datalist id="houseOwnershipOptions">
                    <option value="PERSONALLY OWNED" />
                    <option value="FAMILY OWNED" />
                    <option value="RENTED" />
                    <option value="MORTGAGE" />
                    <option value="SANLANG TIRA" />
                </datalist>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Ownership Remarks'"
                    :placeholder="'any remarks here'"
                    v-model="form.house_ownership_remarks"
                    :error="hasError('house_ownership_remarks') ? errors.house_ownership_remarks[0] : ''"/>
            </div>
        </ap-grid>

        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default
{
    created()
    {
        this.loadProvinces();
    },

    computed:
    {
        ...mapGetters({
            provinces: 'companyBeneficiary/provinces',
            cities: 'companyBeneficiary/cities',
            barangays: 'companyBeneficiary/barangays',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite'
        }),

        async loadProvinces()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/provinces`,
                action: 'provinces'
            });

            this.form.city_id = '';
            this.form.barangay_id = '';

            if (this.form.province_id) this.loadCities();
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

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
