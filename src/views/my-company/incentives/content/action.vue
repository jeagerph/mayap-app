<template>
    <div class="ap-animate ap-animate-fade-in">

        <div class="card card-body ap-padding">

            <form class="ap-form-stacked"
                @submit.prevent="customSearch()">
                <fieldset class="ap-fieldset">
                    <div class="ap-width-xxlarge ap-margin-auto">
                        <p class="ap-text-bold ap-margin-remove-bottom">
                            Search Beneficiary
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
                                    :color="'primary'">
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
<!-- 
                    <ap-button
                        data-tooltip="Custom Date"
                        :color="'primary'"
                        :size="'small'"
                        :outline="true"
                        @click="openModal('date')">
                        <i class="bx bx-calendar"></i> DATE REGISTRATION
                    </ap-button> -->
                    
                </div>
                <div class="ap-text-right@m">
                    <!-- <ap-button
                        data-tooltip="Download"
                        :color="'success'"
                        :size="'small'"
                        :outline="true"
                        @click="openModal('download')">
                        <i class="bx bx-download"></i> REPORT
                    </ap-button> -->
                    <!-- <router-link
                        class="ap-button ap-button-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                        to="/company/patients/create">
                        <i class="lni lni-plus ap-margin-xsmall-right"></i> Create
                    </router-link> -->
                    <!-- <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="true"
                        @click="openOffcanvas('main')">
                        <i class="lni lni-funnel ap-margin-xsmall-right"></i> Filters
                    </ap-button> -->
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
            isLoading: 'companyIncentive/isLoading',
        }),
    },

    methods:
    {
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
