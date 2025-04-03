<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            TITLE & SALUTATION OF THE DOCUMENT
        </p>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :required="true"
            :readonly="isLoading('update')"
            :label="'* Title'"
            :placeholder="'ex. CERTIFICATION'"
            v-model="form.content.title"
            :error="hasError('content.title') ? errors['content.title'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                * Title
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <ap-input
            v-if="!isLoading('edit')"
            type="text"
            :readonly="isLoading('update')"
            :label="'Salutation'"
            :placeholder="'ex. TO WHOM MAY IT CONCERN:'"
            v-model="form.content.salutation"
            :error="hasError('content.salutation') ? errors['content.salutation'][0] : ''"/>
        <div v-else>
            <label class="ap-form-label ap-text-bold">
                Salutation
            </label>
            <ap-placeholder
                :size="'medium'"/>
        </div>

        <p class="ap-text-bold ap-text-primary">
            WORD/PHRASE INPUTS OF THE DOCUMENT
        </p>

        <div class="ap-margin-top">
            <form class="ap-form-stacked"
                @submit.prevent="add()">
                <fieldset>
                    <ap-input
                        class="ap-margin-remove-bottom"
                        type="text"
                        :readonly="isLoading('update')"
                        :label="'INPUT NAME'"
                        :placeholder="'ex. PURPOSE'"
                        v-model="keyword" />
                    <small class="ap-text-italic">
                        Note: Press ENTER to save
                    </small>
                </fieldset>
            </form>

            <div v-if="!isLoading('edit')">
                <div class="ap-margin-small-top"
                    v-if="form.inputs.length">

                    <p class="ap-text-italic">
                        SAVED INPUTS:
                    </p>

                    <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-xsmall-top"
                        v-for="(item, index) in form.inputs"
                        :key="index">
                        <ap-grid :gutter="'small'"
                            class="ap-flex-middle ap-margin-remove-bottom">
                            <div class="ap-width-expand">
                                <ap-input
                                    type="text"
                                    :label="item.label"
                                    :placeholder="'enter default value here'"
                                    v-model="item.value" />
                            </div>
                            <div class="ap-text-right">
                                <ap-button
                                    type="button"
                                    :size="'small'"
                                    :color="'danger'"
                                    :outline="true"
                                    @click="remove(index)">
                                    <i class="lni lni-close"></i>
                                </ap-button>
                            </div>
                        </ap-grid>
                        
                    </div>
                </div>
                <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top" v-else>
                    <p class="ap-text-italic">No input yet</p>
                </div>
            </div>
            <div class="ap-margin-small-top"
                v-else>
                <ap-placeholder
                    :size="'medium'" />
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    :size="'medium'" />
                <ap-placeholder
                    class="ap-margin-xsmall-top"
                    :size="'medium'" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Text } from '@/utils';

export default 
{
    data()
    {
        return {
            keyword: '',
        };
    },

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
        add()
        {
            let checking = this.form.inputs.find(row => row.key == Text.wordToValidKey(this.keyword));

            if (checking) return Toast.error({
                message: 'Keyword already exists.'
            });
            
            this.form.inputs.push({
                label: this.keyword.toUpperCase(),
                key: Text.wordToValidKey(this.keyword),
                value: ''
            });

            this.keyword = '';
        },

        remove(index)
        {
            this.form.inputs.splice(index, 1);
        },
        
        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    }
};
</script>