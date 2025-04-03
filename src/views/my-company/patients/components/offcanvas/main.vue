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
                            STATUS
                        </label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="reset('filter[status]', null)">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-approval">
                        <input class="ap-checkbox" id="status-approval" type="radio"
                            :value="1"
                            v-model="query['filter[status]']">
                        <span class="ap-margin-small-left">
                            FOR APPROVAL
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-in-progress">
                        <input class="ap-checkbox" id="status-in-progress" type="radio"
                            :value="2"
                            v-model="query['filter[status]']">
                        <span class="ap-margin-small-left">
                            IN PROGRESS
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-completed">
                        <input class="ap-checkbox" id="status-completed" type="radio"
                            :value="3"
                            v-model="query['filter[status]']">
                        <span class="ap-margin-small-left">
                            COMPLETED
                        </span>
                    </label>
                </div>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-canceled">
                        <input class="ap-checkbox" id="status-canceled" type="radio"
                            :value="4"
                            v-model="query['filter[status]']">
                        <span class="ap-margin-small-left">
                            CANCELED
                        </span>
                    </label>
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

export default
{
    name: 'Offcanvas',

    data()
    {
        return {
            query:
            {
                'search': null,
                'filter[status]': null
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

                    if (['filter[status]'].includes(key)) return this.query[key] = parseInt(value);

                    this.query[key] = value;
                }
            });
        },

        reset(key=null, value=null)
		{
			if(!key)
			{
                this.query['search'] = null;
                this.query['filter[status]'] = null;
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
