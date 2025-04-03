<template>
    <div>
        <p class="ap-text-bold ap-margin-medium-top ap-text-primary">
            CONTENT OF ID
        </p>

        <hr>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* Title of ID'"
            :placeholder="'ex. ID'"
            v-model="form.content.title"
            :error="hasError('content.title') ? errors['content.title'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                * Title OF ID
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <div class="ap-margin-top">
            <p class="ap-text-italic">
                Set Title Background Color:
            </p>

            <div class="ap-margin-small-top"
                v-if="!isLoading('edit')">
                <input class="ap-input" type="color" v-model="form.view.title_background_color">
                <small class="ap-text-italic">
                    * Click the box above to select a color
                </small>
            </div>
            <ap-placeholder
                v-else
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