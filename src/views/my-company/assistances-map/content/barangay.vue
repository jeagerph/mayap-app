<template>
    <div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div class="ap-card ap-card-body ap-padding-small ap-box-shadow-medium"
                    :class="apCardBackground">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small class="ap-text-inverse">
                                BARANGAYS
                            </small>
                            <h4 class="ap-margin-remove ap-text-inverse"
                                v-if="!isLoading('index')">
                                {{barangayTotal}}
                            </h4>
                            <div class="ap-margin-small-top"
                                v-else>
                                <ap-loader
                                    :size="'small'"
                                    :color="'primary'" />
                            </div>
                            
                        </div>
                        <div class="ap-text-right">
                            <div class="ap-text-inverse ms-auto font-35">
                                <i class="bx bx-user-circle"></i>
                            </div>
                        </div>
                    </ap-grid>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div class="ap-card ap-card-body ap-padding-small ap-box-shadow-medium"
                    :class="apCardBackground">
                    <ap-grid>
                        <div class="ap-width-expand">
                            <small class="ap-text-inverse">
                                ASSISTANCES
                            </small>
                            <h4 class="ap-margin-remove ap-text-inverse"
                                v-if="!isLoading('index')">
                                {{assistancesTotal}}
                            </h4>
                            <div class="ap-margin-small-top"
                                v-else>
                                <ap-loader
                                    :size="'small'"
                                    :color="'primary'" />
                            </div>
                            
                        </div>
                        <div class="ap-text-right">
                            <div class="ap-text-inverse ms-auto font-35">
                                <i class="bx bx-user-check"></i>
                            </div>
                        </div>
                    </ap-grid>
                </div>
            </div>
            
        </ap-grid>

        <div class="ap-card ap-card-body ap-card-white ap-box-shadow-medium ap-margin-top">
            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-expand@m">
                    <input
                        class="ap-input-search-query"
                        type="text" 
                        placeholder="Search Barangay"
                        v-model="query.search"
                        @input="onInput()">
                </div>
            </ap-grid>
            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold">
                        YEAR
                    </small>
                    <select
                        class="ap-select"
                        v-model="query.assistanceYear"
                        @change="onSelectAssistanceYear">
                        <option :value="''">ALL YEAR</option>
                        <option
                            v-for="(year, index) in listOfYears"
                            :key="index"
                            :value="year">{{ year }}</option>
                    </select>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold">
                        CITY/MUNICIPALITY
                    </small>

                    <select
                        v-if="!citiesLoading"
                        class="ap-select"
                        v-model="query.cityCode"
                        @change="onSelectCity">
                        <option :value="''">ALL</option>
                        <option
                            v-for="(city, index) in cities"
                            :key="index"
                            :value="city.city_code">{{ city.name }}</option>
                    </select>
                    <ap-placeholder
                        v-else
                        :size="'medium'" />
                </div>
                
            </ap-grid>
            
            <ap-grid :gutter="'small'"
                class="ap-margin-top ap-margin-bottom">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <a class="ap-link-reset ap-point"
                        @click="selectSort('barangay')">
                        <p class="ap-text-bold ap-text-primary ap-margin-remove">
                            BARANGAYS
                            <i class="ap-margin-small-right bx" :class="sort.key == 'barangay' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>
                        </p>
                    </a>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right">
                    <a class="ap-link-reset ap-point"
                        @click="selectSort('assistances')">
                        <p class="ap-text-bold ap-text-primary ap-margin-remove">
                            ASSISTANCES
                            <i class="ap-margin-small-right bx" :class="sort.key == 'assistances' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>
                        </p>
                    </a>
                    
                </div>
            </ap-grid>

            <div class="ap-margin-small-top ap-margin-bottom"
                v-if="!isLoading('index')">
                <small class="ap-margin-remove">
                    <ap-pagination-showing
                        :page="page" />
                </small>
            </div>
            
            <div
                v-if="!isLoading('index')"
                class="ap-card-scroll-custom"
                @scroll="onScroll">
                <ul class="ap-list ap-list-divider ap-list-hover"
                    v-if="items.length">
                    <li v-for="(item, index) in items"
                    :key="index">
                        <a class="ap-link-reset ap-point"
                            :href="`/company/beneficiaries?filter[barangay]=${item.id}`"
                            target="new">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                    <h5 class="ap-text-bold ap-margin-remove">
                                        BRGY {{ item.barangay_name.toUpperCase() }}
                                    </h5>
                                    <p class="ap-margin-remove">
                                        {{ item.city_name }}, {{ item.province_name }}
                                    </p>
                                </div>
                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right">
                                    <h5 class="ap-text-bold ap-margin-remove">
                                        {{ item.assistances }}
                                    </h5>

                                    <small class="ap-text-bold">
                                        {{ getAmount(item.assistances_amount) }}
                                    </small>
                                </div>
                            </ap-grid>
                        </a>
                    </li>
                </ul>
                <ap-card-empty
                    v-else
                    :label="emptyLabel"/>
            </div>

            <div class="ap-text-center ap-margin-medium-top"
                v-else>
                <ap-placeholder
                    :size="'medium'" />

                <ap-placeholder
                    class="ap-margin-small-top"
                    :size="'medium'" />

                <ap-placeholder
                    class="ap-margin-small-top"
                    :size="'medium'" />

                <ap-placeholder
                    class="ap-margin-small-top"
                    :size="'medium'" />

                <ap-placeholder
                    class="ap-margin-small-top"
                    :size="'medium'" />
                    
            </div>

            <ap-placeholder
                v-if="isLoading('more')"
                    :size="'medium'" />
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Http from '@/services';

import { Text } from '@/utils';

export default
{
    data()
    {
        return {
            barangayTotal: 0,
            assistancesTotal: 0,

            query:
            {
                search: '',
                assistanceYear: '',
                cityCode: '',
            },

            sort:
            {
                key: 'barangay',
                value: 'asc',
            },

            cities: [],
            citiesLoading: false,

            listOfYears: [],

            eventTimer: null
        };
    },

    created()
    {
        this.initialize();

        this.onLoad();

        this.loadCities();
    },

    computed:
    {
        ...mapGetters({
            items: 'companyBarangay/items',
            isLoading: 'companyBarangay/isLoading',
            page: 'companyBarangay/page',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        emptyLabel()
        {
            return Object.keys(this.$route.query).length > 0
                ? 'no search result'
                : 'no record yet';
        },

        nextPage()
        {
            return this.page.nextPage
                ? this.page.nextPage.replace(
                    `${process.env.APP_API_URL}/${process.env.APP_API_VERSION}`,
                    '')
                : null;
        },

        apCardBackground()
        {
            if (this.company.province_id == '0314') return 'ap-card-orange';

            return 'ap-card-primary';
        },
    },

    methods:
    {
        ...mapActions({
            load: 'companyBarangay/load',
            loadMore: 'companyBarangay/loadMore',
            unset: 'companyBarangay/unsetItems',
        }),

        async onLoad()
        {
            let url = '/my-company/assistances/barangays/list?ctx';

            if (this.query.search)
            {
                url += `&search=${this.query.search}`;
            }

            if (this.query.assistanceYear)
            {
                url += `&filter[assistanceYear]=${this.query.assistanceYear}`;
            }

            if (this.query.cityCode)
            {
                url += `&filter[cityCode]=${this.query.cityCode}`;
            }

            url += `&sort[${this.sort.key}]=${this.sort.value}`;
            url += `&page=1`;

            const response = await this.load(url);

            if (response.status == 200)
            {
                this.barangayTotal = response.data.total;
                this.assistancesTotal = response.data.assistances;
            }
        },

        async onLoadMore()
        {
            await this.loadMore(this.nextPage);
        },

        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }})
        {
            if (!this.isLoading('index') && !this.isLoading('more'))
            {
                let sumScrollTopAndClientHeight = scrollTop + clientHeight;
                    sumScrollTopAndClientHeight += 500;

                if (sumScrollTopAndClientHeight >= scrollHeight)
                {
                    if (this.nextPage)
                    {
                        this.loadMore(this.nextPage);
                    }
                }
            }
        },

        selectSort(name)
        {
            if (this.sort.key == name)
            {
                this.sort.value = this.sort.value == 'desc' ? 'asc':'desc';
            }
            else
            {
                this.sort.key = name;
                this.sort.value = 'desc';
            }

            this.onLoad();
        },

        onInput()
        {
            clearTimeout(this.eventTimer);

            this.eventTimer = setTimeout(() => {
                this.onLoad();
            }, 750);
        },

        onSelectAssistanceYear()
        {
            this.onLoad();
        },

        onSelectCity()
        {
            this.onLoad();
        },

        getAmount(amount)
        {
            return Text.currency(amount);
        },

        async loadCities()
        {
            this.citiesLoading = true;

            const response = await Http.get(`/my-company/assistance/cities?filter[provCode]=${this.company.province_id}`);

            this.citiesLoading = false;

            if (response.status == 200)
            {
                this.cities = response.data.data;   
            }
        },

        initialize()
        {
            let currentYear = new Date();

            let startTemp = parseInt(currentYear.getFullYear());
            let endTemp = parseInt(currentYear.getFullYear()) - 5;

            while (startTemp >= endTemp)
            {
                this.listOfYears.push(startTemp);

                startTemp--;
            }

            this.query.search = '';
            this.query.assistanceYear = currentYear.getFullYear();
            this.query.cityCode = '';
        },
    }
}
</script>

<style scoped>

.ap-card-scroll-custom {
    height: 712px;
    overflow: hidden;
}

.ap-card-scroll-custom:hover {
    overflow: auto;
}
</style>