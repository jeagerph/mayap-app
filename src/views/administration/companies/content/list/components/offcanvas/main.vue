<template>
    <ap-offcanvas
        :isOpen.sync="$parent.$data.mainOffcanvas">
        <div class="ap-offcanvas-title ap-text-center">
            <h3>Search and Filter</h3>
        </div>
        <hr>
        <div class="ap-offcanvas-container ap-margin-top">
            <div class="ap-margin-top">
                <form class="ap-form-stacked" @submit.prevent="applySearch()">
                    <label class="ap-margin-remove ap-text-bold">
                        Search
                    </label>
                    <ap-input
                        class="ap-margin-remove"
                        :placeholder="'type any keyword here'"
                        v-model="query.search">
                    </ap-input>
                </form>
            </div>
        </div>
    </ap-offcanvas>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    name: 'Offcanvas',

    data()
    {
        return {
            query:
            {
                'search': null,
            },
        };
    },

    created()
    {
        this.initializeQueries();
    },

    methods:
    {
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

                    if (['filter[userStatus]', 'filter[accountType]'].includes(key)) return this.query[key] = parseInt(value);

                    this.query[key] = value;
                }
            });
        },

        reset(key=null, value=null)
		{
			if(!key)
			{
                this.query['search'] = null;
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
