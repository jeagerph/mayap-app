<template>
    <div>
        <p class="ap-text-bold ap-margin-medium-top ap-text-primary">
            CONTENT OF ID
        </p>

        <hr>

        <ap-input
            type="text"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* Title of ID'"
            :placeholder="'ex. ID'"
            v-model="form.content.title"
            :error="hasError('content.title') ? errors['content.title'][0] : ''"/>

        <div class="ap-margin-top">
            <p class="ap-text-italic">
                Set Title Background Color:
            </p>

            <div class="ap-margin-small-top">
                <input class="ap-input" type="color" v-model="form.view.title_background_color">
                <small class="ap-text-italic">
                    * Click the box above to select a color
                </small>
            </div>
            
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