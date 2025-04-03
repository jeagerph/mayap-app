<template>
    <div class="ap-margin-small-top">

        <p class="ap-text-bold ap-text-primary">
            WORD/PHRASE INPUTS OF THE DOCUMENT
        </p>

        <div class="ap-margin-top"
            v-if="inputs.length">

            <p class="ap-text-italic">
                SAVED WORD/PHRASE INPUTS:
            </p>
            <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-xsmall-top"
                v-for="(item, index) in inputs"
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
        <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top"
            v-else>
            <p class="ap-text-italic">
                No word/phrase inputs
            </p>
        </div>

        <div class="ap-margin-small-top">
            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('inputs')">
                <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                {{errors.inputs[0]}}
            </small>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form, Text, Toast } from '@/utils';

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
            isLoading: 'companyBeneficiaryDocument/isLoading',
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

        inputs()
        {
            return this.form.inputs;
        },

        availableInputs()
        {
            return this.$parent.$data.availableInputs;
        },
    },

    methods:
    {
        add()
        {
            let checking = this.form.inputs.find(row => row.key == Text.wordToValidKey(this.keyword));

            if (checking) return Toast.error({
                message: 'Word input already exists.'
            });

            let input = {
                type: 'word',
                label: this.keyword.toUpperCase(),
                key: Text.wordToValidKey(this.keyword),
                value: ''
            };
            
            this.form.inputs.push(input);

            this.keyword = '';
        },

        remove(index)
        {
            this.form.inputs.splice(index, 1);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
