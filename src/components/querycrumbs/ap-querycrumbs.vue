<template>
    <div class="ap-margin-small-top">
        <p class="ap-margin-remove ap-text-italic" v-if="chips.length">
            You have search / filter:
        </p>

        <div class="ap-inline ap-margin-small-top">
            
            <ap-chips
                v-for="(item, index) in chips"
                :key="index"
                :item="item"
                :icon="item.icon"
                @reset="onClick(item.query)"/>
        </div>
    </div>
</template>

<script>

export default
{
    props:
    {
        queries:
        {
            type: Object,

            default:
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
        },

        onClick:
        {
            type: Function,

            default: (name) =>
            {
                const query = Object.assign({}, this.$route.query);
                delete query[name];

                this.$router.replace({ query });
            }
        }
    },

    data()
    {
        return {
            chips: [],
        };
    },

    created()
    {
        this.initializeChips();
    },

    methods:
    {
        initializeChips()
        {
            const routeQueries = this.$route.query;
            
            const chips = [];

            Object.keys(this.queries).forEach((key) =>
            {

                if (Object.prototype.hasOwnProperty.call(routeQueries, key))
                {
                    const chip = this.queries[key];
                    chip.value = chip.type!='search'
                        ? `${chip.name}: ${chip.options[routeQueries[key]]}`
                        : `${routeQueries[key]}`;
                    
                    chips.unshift(chip);
                }
            });

            this.chips = chips;
        },

        reset()
        {
            const query = Object.assign({}, this.$route.query);
            delete query[name];

            this.$router.replace({ query });
        },
    },
    
    watch:
    {
        $route()
        {
            this.initializeChips();
        },
    },
};
</script>
