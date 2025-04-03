<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            DOCUMENT FILE
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
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Header'"
                    :placeholder="'ex. default.header'"
                    v-model="form.view.header"
                    :error="hasError('view.default.header') ? errors['view']['header'][0] : ''"/>

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Sidebar'"
                    :placeholder="'ex. default.sidebar'"
                    v-model="form.view.sidebar"
                    :error="hasError('view.default.sidebar') ? errors['view']['sidebar'][0] : ''"/>
            </div>
            
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Content'"
                    :placeholder="'ex. default.content'"
                    v-model="form.view.content"
                    :error="hasError('view.default.content') ? errors['view']['content'][0] : ''"/>

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="isLoading('store')"
                    :label="'* Footer'"
                    :placeholder="'ex. default.footer'"
                    v-model="form.view.footer"
                    :error="hasError('view.default.footer') ? errors['view']['footer'][0] : ''"/>
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
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
