<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            ID FILE
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
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
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
            </div>
            
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Front'"
                    :placeholder="'ex. default.front'"
                    v-model="form.view.front"
                    :error="hasError('view.default.front') ? errors['view']['front'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Front
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>
            </div>
            
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :required="true"
                    :readonly="isLoading('update')"
                    :label="'* Back'"
                    :placeholder="'ex. default.back'"
                    v-model="form.view.back"
                    :error="hasError('view.default.back') ? errors['view']['back'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        * Back
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
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
