<template>
    <li>
        <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small">
            <ap-grid :gutter="'small'">
                <div class="ap-width-expand ap-point"
                    @click="toggle()">
                    <small class="ap-text-bold ap-text-italic">
                        RECORD {{parseInt($vnode.key)+1}}
                    </small>
                </div>
                <div class="ap-text-right">
                    <a class="ap-link-reset ap-text-danger ap-point"
                        @click="remove()">
                        <small>
                            <i class="lni lni-close"></i>
                        </small>
                    </a>
                </div>
            </ap-grid>

            <div class="ap-margin-small-top"
                v-show="show">
                <hr>
                
                <ap-input
                    v-for="(field, index) in fields"
                    :key="index"
                    type="text"
                    :label="field.label"
                    :placeholder="'enter value here'"
                    v-model="value[field.key]" />
            </div>
        </div>

    </li>
</template>

<script>
export default
{
    props:
    {
        value: Object,
        tbIndex: Number
    },

    data()
    {
        return {
            show: false,
        }
    },  

    computed:
    {
        form()
        {
            return this.$parent.$parent.$data.form;
        },

        fields()
        {
            return this.form.tables[this.tbIndex].fields;
        },
    },

    methods:
    {
        remove()
        {
            this.form.tables[this.tbIndex].values.splice(this.$vnode.key, 1);
        },

        toggle()
        {
            this.show = !this.show;
        },
    },
};
</script>
