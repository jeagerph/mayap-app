<template>
    <div class="ap-animate ap-animate-fade-in">

        <div class="card card-body ap-padding">

            <form class="ap-form-stacked"
                @submit.prevent="customSearch()">
                <fieldset class="ap-fieldset">
                    <div class="ap-width-xxlarge ap-margin-auto">
                        <p class="ap-text-bold ap-margin-remove-bottom">
                            Search Patient
                        </p>

                        <div>
                            <small class="ap-text-italic">
                                Fill-out the form below for searching.
                            </small>
                        </div>

                        <ap-grid
                            class="ap-margin-top">
                            <div class="ap-width-expand">
                                <ap-grid :gutter="'small'">
                                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                        <input class="ap-input-custom" type="text" placeholder="First Name" v-model="search.firstName">
                                        <small class="ap-text-italic ap-margin-left">
                                            (Optional)
                                        </small>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                        <input class="ap-input-custom" type="text" placeholder="Middle Name" v-model="search.middleName">
                                        <small class="ap-text-italic ap-margin-left">
                                            (Optional)
                                        </small>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                                        <input class="ap-input-custom" type="text" placeholder="Last Name" required v-model="search.lastName">
                                    </div>
                                </ap-grid>
                                
                            </div>
                            <div class="ap-text-right">
                                <ap-button
                                    class="ap-margin-small-top"
                                    type="submit"
                                    :size="'medium'"
                                    :color="apButtonBackground">
                                    <i class="lni lni-search"></i>
                                </ap-button>
                            </div>
                        </ap-grid>
                    </div>
                </fieldset>
            </form>
        </div>

        <div class="ap-margin">

            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-expand@m">

                    <div class="ap-inline ap-margin-small-right">
                        <small class="ap-text-bold">
                            FILTER:
                        </small>
                    </div>
                    
                    <ap-button
                        :color="hasFilterApproval ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterApproval"
                        @click="toggleFilter('filter[status]', 1)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterApproval"></i> FOR APPROVAL
                    </ap-button>
                    
                    <ap-button
                        :color="hasFilterInProgress ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterInProgress"
                        @click="toggleFilter('filter[status]', 2)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterInProgress"></i> IN PROGRESS
                    </ap-button>
                    
                    <ap-button
                        :color="hasFilterCompleted ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterCompleted"
                        @click="toggleFilter('filter[status]', 3)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterCompleted"></i> COMPLETED
                    </ap-button>
                    
                    <ap-button
                        :color="hasFilterCanceled ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterCanceled"
                        @click="toggleFilter('filter[status]', 4)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterCanceled"></i> CANCELED
                    </ap-button>
                    
                </div>
                <div class="ap-text-right@m">
                    
                    <div class="dropdown ap-inline"
                    v-permit:access="'company-patients-download-reports'">
                        <ap-button
                            :class="'dropdown-toggle'"
                            data-bs-toggle="dropdown"
                            :color="'success'"
                            :size="'small'"
                            :outline="true">
                            <i class="bx bx-download"></i> REPORTS
                        </ap-button>
                        <ul class="dropdown-menu" style="margin: 0px;">
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('download')">
                                    PATIENT LIST
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('downloadByBarangay')">
                                    PATIENT BY BARANGAY
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('downloadByPurok')">
                                    PATIENT BY PUROK/SITIO
                                </a>
                            </li>
                        </ul>
                    </div>

                    <span class="ap-margin-small-left ap-margin-small-right">
                        |
                    </span>

                    <ap-button
                        :color="apButtonBackground"
                        :size="'small'"
                        :rounded="true"
                        @click="openModal('create')">
                        <i class="lni lni-plus ap-margin-xsmall-right"></i> Create
                    </ap-button>
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="true"
                        @click="openOffcanvas('main')">
                        <i class="lni lni-funnel ap-margin-xsmall-right"></i> Filters
                    </ap-button>
                </div>
            </ap-grid>

            <ap-querycrumbs
                :queries="queries"
                :onClick="reset" />
            
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    data()
    {
        return {
            search:
            {
                firstName: '',
                middleName: '',
                lastName: '',
            },

            query:
            {
                'search': null,
            },

            queries:
            {
                'search': 
                {
                    name: '',
                    type: 'search',
                    icon: 'lni-search',
                    query: 'search',
                    options: ''
                },
            },

        };
    },

    created()
    {
        this.initializeQueries();
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyPatient/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        hasFilterApproval()
        {
            return Object.keys(this.$route.query).includes('filter[status]') && this.$route.query['filter[status]'] == 1;
        },

        hasFilterInProgress()
        {
            return Object.keys(this.$route.query).includes('filter[status]') && this.$route.query['filter[status]'] == 2;
        },

        hasFilterCompleted()
        {
            return Object.keys(this.$route.query).includes('filter[status]') && this.$route.query['filter[status]'] == 3;
        },

        hasFilterCanceled()
        {
            return Object.keys(this.$route.query).includes('filter[status]') && this.$route.query['filter[status]'] == 4;
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        }
    },

    methods:
    {
        toggleFilter(filter, id)
        {
            let value = this.$route.query[filter];

            if (value == 1 && id == 1 || value == 2 && id == 2 || value == 3 && id == 3 || value == 4 && id == 4)
            {
                this.reset(filter);
            }
            else
            {
                let query = {};

                query[filter] = id;

                this.$router.replace({
                    ...this.$router.currentRoute,
                    query:
                    {
                        ...this.$route.query,

                        ...query,
                    }
                });
            }
        },

        customSearch()
        {
            this.$router.replace({
                ...this.$router.currentRoute,
                query:
                {
                    ...this.search,
                }
            });
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
        },

        initializeQueries()
        {
            const queries = this.$route.query;

            Object.keys(queries).forEach((key) =>
            {
                if (Object.prototype.hasOwnProperty.call(queries, key))
                {
                    const value = queries[key];

                    // if (['filter[status]', 'filter[viewed]'].includes(key)) return this.query[key] = parseInt(value);

                    this.query[key] = value;
                }
            });
        },

        reset(name)
        {
            const query = Object.assign({}, this.$route.query);
            delete query[name];

            this.$router.replace({ query });
        },

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },

        openOffcanvas(name)
        {
            this.$parent.toggleOffcanvas(name, true);
        },
    },
};
</script>
