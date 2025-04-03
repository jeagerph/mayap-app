<template>
    <li class="ap-point" @click="show = !show">
        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-fit-content">
                <div class="ap-avatar ap-avatar-circle">
                    <div class="ap-avatar-content">
                        <i class="lni lni-information"></i>
                    </div>
                </div>
            </div>
            <div class="ap-width-expand">
                <p class="ap-margin-xsmall-top">{{auditBy}} {{item.description}}</p>
                <small class="ap-text-italic">
                    <ap-moment :datetime="item.audit_at" />
                </small>
            </div>
        </ap-grid>

        <div class="ap-animate ap-animate-fade-in ap-margin-small" v-show="show">
            <small v-if="fields.length">
                <span class="ap-text-bold">
                    Inputs:
                </span>
                <ul class="ap-list ap-list-bullet ap-padding-remove">
                    <li
                        style="padding-left: 5px !important;"
                        v-for="(row, index) in fields"
                        :key="index">
                        {{row}}
                    </li>
                </ul>
            </small>
            <small v-else>
                No data to display
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

            if (this.item.data)
            {
                const keys = Object.keys(this.item.data);

                if (keys.length)
                {
                    keys.forEach(row => {
                        list.push(
                            `${row}: ${this.item.data[row]}`
                        );
                    });
                }
            }

            return list;
        },

        auditBy()
        {
            return this.item.audit_by.name;
        },
    },
};
</script>
