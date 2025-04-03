<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            DOCUMENT FILE
        </p>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* File'"
            :placeholder="'ex. default'"
            v-model="form.view.index"
            :error="hasError('view.index') ? errors['view']['index'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                * File
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-grid>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Header'"
                    :placeholder="'ex. default.header'"
                    v-model="form.view.header"
                    :error="hasError('view.default.header') ? errors['view']['header'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Header
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>

                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Sidebar'"
                    :placeholder="'ex. default.sidebar'"
                    v-model="form.view.sidebar"
                    :error="hasError('view.default.sidebar') ? errors['view']['sidebar'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Sidebar
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
            
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Content'"
                    :placeholder="'ex. default.content'"
                    v-model="form.view.content"
                    :error="hasError('view.default.content') ? errors['view']['content'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Content
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>

                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Footer'"
                    :placeholder="'ex. default.footer'"
                    v-model="form.view.footer"
                    :error="hasError('view.default.footer') ? errors['view']['footer'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Footer
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
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
            form: 'myCompanyDocumentTemplate/editForm',
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
