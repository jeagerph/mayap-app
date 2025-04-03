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
                                {{ appBeneficiaryName }}
                            </small>
                            <h4 class="ap-margin-remove ap-text-inverse"
                                v-if="!isLoading('index')">
                                {{beneficiariesTotal}}
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
            
        </ap-grid>

        <div class="ap-card ap-card-body ap-card-white ap-box-shadow-medium ap-margin-top">
            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-expand">
                    <input
                        class="ap-input-search-query"
                        type="text" 
                        placeholder="Search Barangay"
                        v-model="query.search"
                    @input="onInput()">
                </div>
                <div class="ap-text-right@m">
                    <div>
                        <ap-button
                            class="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            :size="'small'"
                            :color="'primary'"
                            :outline="true"
                            :rounded="true">
                            <i class="bx" :class="sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i> {{ sort.key.toUpperCase() }}
                        </ap-button>
                        <ul class="dropdown-menu" style="margin: 0px;">
                            <li><a class="dropdown-item ap-point" @click="selectSort('beneficiaries')"><i class="ap-margin-small-right bx" :class="sort.key == 'beneficiaries' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i> {{ appBeneficiaryName }}</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('officers')"><i class="ap-margin-small-right bx" :class="sort.key == 'officers' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>OFFICERS</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('priorities')"><i class="ap-margin-small-right bx" :class="sort.key == 'priorities' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>PRIORITIES</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('household')"><i class="ap-margin-small-right bx" :class="sort.key == 'household' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>HOUSEHOLD</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('networks')"><i class="ap-margin-small-right bx" :class="sort.key == 'networks' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>NETWORKS</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('patients')"><i class="ap-margin-small-right bx" :class="sort.key == 'patients' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>PATIENTS</a></li>
                            <li><a class="dropdown-item ap-point" @click="selectSort('assisted')"><i class="ap-margin-small-right bx" :class="sort.key == 'assisted' && sort.value == 'desc' ? 'bx-sort-down':'bx-sort-up'"></i>ASSISTED</a></li>
                        </ul>
                    </div>
                </div>
            </ap-grid>
            
            <ap-grid :gutter="'small'"
                class="ap-margin-top ap-margin-bottom">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <p class="ap-text-bold ap-text-primary ap-margin-remove">
                        LIST OF BARANGAYS
                    </p>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right">
                    <p class="ap-text-bold ap-text-primary ap-margin-remove">
                        {{ appBeneficiaryName }}
                    </p>
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
                                        {{ item.beneficiaries }}
                                    </h5>
                                </div>
                            </ap-grid>

                            <ap-grid :gutter="'small'">
                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                    <ap-grid :gutter="'small'">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                OFFICERS
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.officers }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                NETWORKS
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.networks }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                HOUSEHOLD
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.household }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                PRIORITIES
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.priorities }}
                                            </p>
                                        </div>
                                    </ap-grid>
                                </div>

                                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                PATIENTS
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.patients }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                INCENTIVES
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.add_incentives - item.deduct_incentives }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                REQUESTED
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.requested }}
                                            </p>
                                        </div>
                                    </ap-grid>

                                    <ap-grid :gutter="'small'"
                                        class="ap-margin-remove-top">
                                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                                            <small>
                                                ASSISTED
                                            </small>
                                        </div>
                                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right@m">
                                            <p class="ap-text-bold ap-margin-remove">
                                                {{ item.assisted }}
                                            </p>
                                        </div>
                                    </ap-grid>
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

export default
{
    data()
    {
        return {
            barangayTotal: 0,
            beneficiariesTotal: 0,

            query:
            {
                search: '',
            },

            sort:
            {
                key: 'beneficiaries',
                value: 'desc',
            },

            eventTimer: null
        };
    },

    created()
    {
        this.onLoad();
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

        appBeneficiaryName()
        {
            return process.env.APP_BENEFICIARY_PLURAL_NAME;
        }
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
            let url = '/my-company/beneficiaries/barangays/summary?ctx';

            if (this.query.search)
            {
                url += `&search=${this.query.search}`;
            }

            url += `&sort[${this.sort.key}]=${this.sort.value}`;
            url += `&page=1`;

            const response = await this.load(url);

            if (response.status == 200)
            {
                this.barangayTotal = response.data.total;
                this.beneficiariesTotal = response.data.beneficiaries;
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