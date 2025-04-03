<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            ID FILE
        </p>

        <ap-input
            type="text"
            :required="true"
            :readonly="isLoading('store')"
            :label="'* File'"
            :placeholder="'ex. default'"
            v-model="form.view.index"
            :error="hasError('view.index') ? errors['view']['index'][0] : ''"/>

        <ap-grid>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Header'"
                    :placeholder="'ex. default.header'"
                    v-model="form.view.header"
                    :error="hasError('view.default.header') ? errors['view']['header'][0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Front'"
                    :placeholder="'ex. default.front'"
                    v-model="form.view.front"
                    :error="hasError('view.default.front') ? errors['view']['front'][0] : ''"/>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Back'"
                    :placeholder="'ex. default.back'"
                    v-model="form.view.back"
                    :error="hasError('view.default.back') ? errors['view']['back'][0] : ''"/>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form } from '@/utils';

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
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
