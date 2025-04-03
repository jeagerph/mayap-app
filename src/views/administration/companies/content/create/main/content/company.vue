<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            COMPANY INFORMATION
        </p>

        <hr>

        <ap-input
            class="ap-margin-small-top"
            type="text"
            :readonly="isLoading('store')"
            :label="'* Name'"
            :placeholder="'ex. COMPANY'"
            v-model="form.name"
            :error="hasError('name') ? errors.name[0] : ''"/>

        <ap-input
            class="ap-margin-small-top"
            type="text"
            :readonly="isLoading('store')"
            :label="'Address'"
            :placeholder="'ex. OLONGAPO CITY'"
            v-model="form.address"
            :error="hasError('address') ? errors.address[0] : ''"/>

        <ap-input
            type="text"
            :readonly="isLoading('store')"
            :label="'Contact No.'"
            :placeholder="'ex. 09XXXXXXXXX'"
            v-model="form.contact_no"
            :error="hasError('contact_no') ? errors.contact_no[0] : ''"/>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            isLoading: 'adminCompany/isLoading',
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