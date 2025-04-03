<template>
    <li class="ap-point">
        <div @click="show = !show">
            <p>You {{item.description}}</p>

            <div class="ap-animate ap-animate-fade-in ap-margin-small" v-show="show">
                <small v-if="fields.length">
                    <span class="ap-text-bold">
                        Inputs:
                    </span>
                    <ul class="ap-list ap-list-bullet ap-padding-remove">
                        <li v-for="(row, index) in fields"
                            :key="index">
                            {{row}}
                        </li>
                    </ul>
                </small>
                <small v-else>
                    No data to display
                </small>
            </div>

            <small>
                <ap-moment :datetime="item.audit_at" />
            </small>
        </div>
        
    </li>
</template>

<script>
export default
{
    props:
    {
        item: Object,
    },

    data()
    {
        return {
            show: false,
        };
    },

    computed:
    {
        fields()
        {
            let list = [];

            const keys = Object.keys(this.item.data);

            if (keys.length)
            {
                keys.forEach(row => {
                    list.push(
                        `${row}: ${this.item.data[row]}`
                    );
                });
            }

            return list;
        },
    },
};
</script>
