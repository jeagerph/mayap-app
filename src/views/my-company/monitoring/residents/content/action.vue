<template>
    <div class="ap-animate ap-animate-fade-in">

        <div class="card card-body ap-padding">

            <form class="ap-form-stacked"
                @submit.prevent="customSearch()">
                <fieldset class="ap-fieldset">
                    <div class="ap-width-xxlarge ap-margin-auto">
                        <p class="ap-text-bold ap-margin-remove-bottom">
                            Search Resident
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
                'filter[isHousehold]': 
                {
                    name: 'HEAD OF HOUSEHOLD',
                    type: 'filter',
                    icon: 'lni-filter',
                    query: 'filter',
                    options: {
                        1: 'YES',
                        0: 'NO'
                    }
                },
                'filter[gender]': 
                {
                    name: 'Gender',
                    type: 'filter',
                    icon: 'lni-filter',
                    query: 'filter',
                    options: {
                        1: 'MALE',
                        2: 'FEMALE'
                    }
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
            isLoading: 'companyResident/isLoading',
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
                    barangay: this.$route.query.barangay,
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
                    barangay: this.$route.query.barangay,
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
