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

            <div class="ap-margin-top">
                <ap-grid>
                    <div class="ap-width-expand">
                        <label class="ap-form-label ap-text-bold">Status</label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="reset('filter[userStatus]', null)">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-enabled">
                        <input class="ap-checkbox" id="status-enabled" type="radio"
                            :value="0"
                            v-model="query['filter[userStatus]']">
                        <span class="ap-margin-small-left">
                            Active
                        </span>
                    </label>
                </div>
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="status-disabled">
                        <input class="ap-checkbox" id="status-disabled" type="radio"
                            :value="1"
                            v-model="query['filter[userStatus]']">
                        <span class="ap-margin-small-left">
                            Locked
                        </span>
                    </label>
                </div>
            </div>

            <hr>

            <div class="ap-margin-top">
                <ap-grid>
                    <div class="ap-width-expand">
                        <label class="ap-form-label ap-text-bold">
                            Account Type
                        </label>
                    </div>
                    <div class="ap-text-right">
                        <ap-button
                            :text="true"
                            :color="'danger'"
                            @click="reset('filter[accountType]', null)">
                            <i class="lni lni-close"></i>
                        </ap-button>
                    </div>
                </ap-grid>
                
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="account-type-system-administrator">
                        <input class="ap-checkbox" id="account-type-system-administrator" type="radio"
                            :value="1"
                            v-model="query['filter[accountType]']">
                        <span class="ap-margin-small-left">System Administrator</span>
                    </label>
                </div>
                <div class="ap-margin-small-top ap-margin-right">
                    <label for="account-type-administrator">
                        <input class="ap-checkbox" id="account-type-administrator" type="radio"
                            :value="2"
                            v-model="query['filter[accountType]']">
                        <span class="ap-margin-small-left">Company</span>
                    </label>
                </div>
            </div>

            <hr>

            <div>
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
                'filter[userStatus]' : null,
                'filter[accountType]' : null,
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
                this.query['filter[userStatus]'] = null;
                this.query['filter[accountType]'] = null;
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
