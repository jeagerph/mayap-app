<template>
    <div class="ap-margin-top">

        <p class="ap-text-bold ap-text-primary">
            TABLE INPUTS OF THE DOCUMENT
        </p>

        <div class="ap-margin-top">

            <div class="ap-margin-small-top"
                v-if="tables.length">

                <ul class="ap-list ap-list-small">
                    <li v-for="(item, tbIndex) in tables"
                        :key="tbIndex">
                        <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-xsmall-top">
                            <ap-grid :gutter="'small'">
                                <div class="ap-width-expand">
                                    <p class="ap-text-bold">
                                        {{item.label}}
                                    </p>
                                </div>
                                <div class="ap-text-right"
                                    v-if="item.values.length">
                                    <a class="ap-link-reset ap-text-primary ap-point"
                                        @click="addValue(tbIndex)">
                                        <small>
                                            <i class="lni lni-plus"></i> NEW
                                        </small>
                                    </a>
                                </div>
                            </ap-grid>

                            <div class="ap-margin-small-top"
                                v-if="item.values.length">
                                
                                <ul class="ap-list ap-padding-remove">
                                    <value-component
                                        v-for="(value, vIndex) in item.values"
                                        :key="vIndex"
                                        :value="value"
                                        :tbIndex="tbIndex" />
                                </ul>
                            </div>

                            <div class="ap-margin-small-top ap-text-center"
                                v-else>
                                <p class="ap-margin-remove-top ap-text-italic">
                                    No records yet
                                </p>
                                <a class="ap-link-reset ap-text-primary ap-point"
                                    @click="addValue(tbIndex)">
                                    <small>
                                        <i class="lni lni-plus"></i> NEW RECORD
                                    </small>
                                </a>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
            <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top"
                v-else>
                <p class="ap-text-italic">
                    No table inputs
                </p>
            </div>

            <div class="ap-margin-small-top">
                <small class="ap-text-bold ap-text-danger"
                    v-if="hasError('tables')">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors.tables[0]}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form, Dater } from '@/utils';

import ValueComponent from './content/value';

export default
{
    components:
    {
        ValueComponent,
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

        tables()
        {
            return this.form.tables;
        },
    },

    methods:
    {
        addValue(tbIndex)
        {
            let table = this.tables[tbIndex];

            let fields = table.fields;

            let values = table.values;

            let value = {};

            fields.forEach(row => {
                value[row.key] = ''
            });

            values.push(value);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
