<template>
    <div class="ap-animate ap-animate-fade-in">

        <div class="card card-body ap-padding">

            <form class="ap-form-stacked"
                @submit.prevent="applySearch()">
                <fieldset class="ap-fieldset">
                    <div class="ap-width-xxlarge ap-margin-auto">
                        <p class="ap-text-bold ap-margin-remove-bottom">
                            Search Assistance
                        </p>

                        <div>
                            <small class="ap-text-italic">
                                Fill-out the form below for searching.
                            </small>
                        </div>

                        <ap-grid
                            class="ap-margin-top">
                            <div class="ap-width-expand">
                                <input class="ap-input-custom" type="text" placeholder="TYPE OF ASSISTANCE / LAST NAME" v-model="query.search">
                                
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
                        :color="hasFilterAssisted ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterAssisted"
                        @click="toggleFilter('filter[assisted]', 1)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterAssisted"></i> ASSISTED
                    </ap-button>

                    <ap-button
                        :color="hasFilterUnassisted ? 'info': 'default'"
                        :size="'small'"
                        :outline="!hasFilterUnassisted"
                        @click="toggleFilter('filter[assisted]', 0)">
                        <i class="bx bx-check ap-margin-xsmall-right" v-show="hasFilterUnassisted"></i> UN-ASSISTED
                    </ap-button>
                    
                </div>
                <div class="ap-text-right@m">
                    <div class="dropdown ap-inline"
                    v-permit:access="'company-assistances-download-reports'">
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
                                    ASSISTANCE LIST
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('downloadByBarangay')">
                                    ASSISTANCE BY BARANGAY
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('downloadByPurok')">
                                    ASSISTANCE BY PUROK/SITIO
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item ap-point"
                                    @click="openModal('downloadByFrom')">
                                    ASSISTANCE FROM
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
            isLoading: 'companyAssistance/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        hasFilterAssisted()
        {
            return Object.keys(this.$route.query).includes('filter[assisted]') && this.$route.query['filter[assisted]'] == 1;
        },

        hasFilterUnassisted()
        {
            return Object.keys(this.$route.query).includes('filter[assisted]') && this.$route.query['filter[assisted]'] == 0;
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

            if (value == 1 && id == 1 || value == 0 && id == 0)
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
