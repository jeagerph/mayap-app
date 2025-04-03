<template>
    <div>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* Name of ID Template'"
            :placeholder="'ex. IDENTIFICATION CARD'"
            v-model="form.name"
            :error="hasError('name') ? errors['name'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                * Name of ID Template
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Description'"
            :placeholder="'any description'"
            v-model="form.description"
            :error="hasError('description') ? errors['description'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                Description
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default 
{

    computed:
    {
        ...mapGetters({
            form: 'myCompanyIdTemplate/editForm',
            isLoading: 'myCompanyIdTemplate/isLoading',
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