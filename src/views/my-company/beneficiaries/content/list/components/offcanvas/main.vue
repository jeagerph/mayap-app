<template>
    <ap-offcanvas
        :isOpen.sync="$parent.$data.mainOffcanvas">
        <div class="ap-offcanvas-title ap-text-center">
            <h3 class="ap-text-bold">FILTER</h3>
        </div>
        <hr>
        <div class="ap-offcanvas-container ap-margin-top">

            <div class="ap-margin-top">
                <ap-grid>
                    <div class="ap-width-expand">
                        <label class="ap-form-label ap-text-bold">
                            TYPE OF VOTER
                        </label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="reset('filter[voterType]', null)">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="voter-type-cv">
                        <input class="ap-checkbox" id="voter-type-cv" type="radio"
                            :value="2"
                            v-model="query['filter[voterType]']">
                        <span class="ap-margin-small-left">
                            COMMAND VOTES (CV)
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="voter-type-sv">
                        <input class="ap-checkbox" id="voter-type-sv" type="radio"
                            :value="3"
                            v-model="query['filter[voterType]']">
                        <span class="ap-margin-small-left">
                            SURE VOTES (SV)
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="voter-type-sw">
                        <input class="ap-checkbox" id="voter-type-sw" type="radio"
                            :value="4"
                            v-model="query['filter[voterType]']">
                        <span class="ap-margin-small-left">
                            SWING VOTES (SW)
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="voter-type-bl">
                        <input class="ap-checkbox" id="voter-type-bl" type="radio"
                            :value="5"
                            v-model="query['filter[voterType]']">
                        <span class="ap-margin-small-left">
                            BLOCK LISTED (BL)
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="voter-type-oth">
                        <input class="ap-checkbox" id="voter-type-oth" type="radio"
                            :value="1"
                            v-model="query['filter[voterType]']">
                        <span class="ap-margin-small-left">
                            OTHERS (OTH)
                        </span>
                    </label>
                </div>
            </div>

            <div class="ap-margin-top">
                <ap-grid>
                    <div class="ap-width-expand">
                        <label class="ap-form-label ap-text-bold">
                            GENDER
                        </label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="reset('filter[gender]', null)">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="gender-male">
                        <input class="ap-checkbox" id="gender-male" type="radio"
                            :value="1"
                            v-model="query['filter[gender]']">
                        <span class="ap-margin-small-left">
                            MALE
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="gender-female">
                        <input class="ap-checkbox" id="gender-female" type="radio"
                            :value="2"
                            v-model="query['filter[isHousehold]']">
                        <span class="ap-margin-small-left">
                            FEMALE
                        </span>
                    </label>
                </div>
            </div>

            <div class="ap-margin-top">
                <ap-grid>
                    <div class="ap-width-expand">
                        <label class="ap-form-label ap-text-bold">
                            ADDRESS
                        </label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="resetAddress()">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-top">
                    <label class="ap-text-bold ap-form-label">
                        Province
                    </label>

                    <select class="ap-select"
                        v-if="!isLoading('provinces')"
                        v-model="query['filter[provCode]']"
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

                <div class="ap-margin"
                    v-if="query['filter[provCode]']">
                    <label class="ap-form-label ap-text-bold">
                        City/Municipality
                    </label>
                    <select class="ap-select"
                        v-if="!isLoading('cities')"
                        v-model="query['filter[cityCode]']"
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
                </div>
                <ap-input
                    v-else
                    :label="'* City/Municipality'"
                    :value="'Select a province first...'"
                    :disabled="true" />

                <div
                    v-if="query['filter[cityCode]']">
                    <label class="ap-form-label ap-text-bold">
                        Barangay
                    </label>
                    <select class="ap-select"
                        v-if="!isLoading('barangays')"
                        v-model="query['filter[barangay]']">
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

                <hr>

                <div class="ap-margin-top">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <label class="ap-form-label ap-text-bold">
                                AGE
                            </label>
                        </div>
                        <div class="ap-text-right">
                            <ap-button
                                :text="true"
                                :color="'danger'"
                                @click="resetAddress()">
                                <i class="lni lni-close"></i>
                            </ap-button>
                        </div>
                    </ap-grid>

                    <div class="ap-margin-small-top ap-margin-right">
                        <label for="age-range-1">
                            <input class="ap-checkbox" id="age-range-1" type="radio"
                                value="1,15"
                                v-model="query['filter[age]']">
                            <span class="ap-margin-small-left">
                                15 yrs old and below
                            </span>
                        </label>
                    </div>

                    <div class="ap-margin-small-top ap-margin-right">
                        <label for="age-range-2">
                            <input class="ap-checkbox" id="age-range-2" type="radio"
                                value="16,25"
                                v-model="query['filter[age]']">
                            <span class="ap-margin-small-left">
                                16 to 25 yrs old
                            </span>
                        </label>
                    </div>

                    <div class="ap-margin-small-top ap-margin-right">
                        <label for="age-range-3">
                            <input class="ap-checkbox" id="age-range-3" type="radio"
                                value="36,45"
                                v-model="query['filter[age]']">
                            <span class="ap-margin-small-left">
                                36 to 45 yrs old
                            </span>
                        </label>
                    </div>

                    <div class="ap-margin-small-top ap-margin-right">
                        <label for="age-range-4">
                            <input class="ap-checkbox" id="age-range-4" type="radio"
                                value="46,59"
                                v-model="query['filter[age]']">
                            <span class="ap-margin-small-left">
                                46 to 59 yrs old
                            </span>
                        </label>
                    </div>

                    <div class="ap-margin-small-top ap-margin-right">
                        <label for="age-range-5">
                            <input class="ap-checkbox" id="age-range-5" type="radio"
                                value="60,100"
                                v-model="query['filter[age]']">
                            <span class="ap-margin-small-left">
                                60 yrs old and above
                            </span>
                        </label>
                    </div>
                </div>
                    
            </div>

            <div class="ap-margin-medium-top">
                <ap-button
                    class="ap-margin-small-top"
                    :color="'primary'"
                    :fullWidth="true"
                    @click="applyFilter()">
                    Apply Filter
                </ap-button>
                <ap-button
                    class="ap-margin-small-top"
                    :fullWidth="true"
                    @click="reset()">
                    Reset All
                </ap-button>
            </div>
        </div>
    </ap-offcanvas>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default
{
    name: 'Offcanvas',

    data()
    {
        return {
            query:
            {
                'search': null,
                'filter[isHousehold]': '',
                'filter[isOfficer]': '',
                'filter[isPriority]': '',
                'filter[gender]': '',
                'filter[provCode]': '',
                'filter[cityCode]': '',
                'filter[barangay]': '',
                'filter[age]': '',
                'filter[voterType]': '',
            },
        };
    },

    created()
    {
        this.initializeQueries();

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
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async loadProvinces()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/provinces`,
                action: 'provinces'
            });

            this.query['filter[cityCode]'] = '';
            this.query['filter[barangay]'] = '';
        },

        async loadCities()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/cities?filter[provCode]=${this.query['filter[provCode]']}`,
                action: 'cities'
            });

            this.query['filter[barangay]'] = '';
        },

        async loadBarangays()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/barangays?filter[cityCode]=${this.query['filter[cityCode]']}`,
                action: 'barangays'
            });
        },

        onSelectProvince()
        {
            this.loadCities();

            this.query['filter[cityCode]'] = '';
            this.query['filter[barangay]'] = '';
        },

        onSelectCity()
        {
            this.loadBarangays();

            this.query['filter[barangay]'] = '';
        },

        applySearch()
        {
            this.$router.replace({
                ...this.$router.currentRoute,
                query:
                {
                    search: this.query.search
                }
            });

            this.closeOffcanvas();
        },

        applyFilter()
        {
            this.$router.replace({
                ...this.$router.currentRoute,
                query: this.applyQueries()
            });

            this.closeOffcanvas();
        },

        applyQueries()
        {
            const queries = this.query;

            const forQueries = {};

            Object.keys(queries).forEach((key) =>
            {
                if (Object.prototype.hasOwnProperty.call(queries, key))
                {
                    const value = queries[key];

                    if (value || value === 0)
                    {
                        forQueries[key] = value;
                    }
                }
            });

            return forQueries;
        },

        initializeQueries()
        {
            const queries = this.$route.query;

            Object.keys(queries).forEach((key) =>
            {
                if (Object.prototype.hasOwnProperty.call(queries, key))
                {
                    const value = queries[key];

                    if (['filter[isHousehold]', 'filter[gender]', 'filter[isOfficer]', 'filter[isPriority]', 'filter[voterType]'].includes(key)) return this.query[key] = parseInt(value);

                    this.query[key] = value;
                }
            });
        },

        resetAddress()
        {
            this.query['filter[provCode]'] = '';
            this.query['filter[cityCode]'] = '';
            this.query['filter[barangay]'] = '';
        },

        reset(key=null, value=null)
		{
			if(!key)
			{
                this.query['search'] = null;
                this.query['filter[isHousehold]'] = '';
                this.query['filter[isOfficer]'] = '';
                this.query['filter[isPriority]'] = '';
                this.query['filter[gender]'] = '';
                this.query['filter[provCode]'] = '';
                this.query['filter[cityCode]'] = '';
                this.query['filter[barangay]'] = '';
                this.query['filter[age]'] = '';
                this.query['filter[voterType]'] = '';
			}
			else
			{
				this.query[key] = value;
			}

			this.$router.replace({
                ...this.$router.currentRoute,
                query: this.applyQueries()
            });

            this.closeOffcanvas();
        },
        
        closeOffcanvas()
        {
            this.$parent.toggleOffcanvas('main', false);
        },
    },
};
</script>
