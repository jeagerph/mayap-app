<template>
    <div class="ap-margin-medium-top">

        <ap-input
            type="text"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* Name of Document Template'"
            :placeholder="'ex. CERTIFICATION'"
            v-model="form.name"
            :error="hasError('name') ? errors['name'][0] : ''"/>

        <ap-input
            type="text"
            :readonly="isLoading('store')"
            :label="'Description'"
            :placeholder="'any description'"
            v-model="form.description"
            :error="hasError('description') ? errors['description'][0] : ''"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default 
{
    computed:
    {
        ...mapGetters({
            idTemplate: 'myCompanyDocumentTemplate/documentTypes',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
}
</script>