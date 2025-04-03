<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            TABLES OF THE DOCUMENT
        </p>

        <div class="ap-margin-top">
            <form class="ap-form-stacked"
                @submit.prevent="add()">
                <fieldset>
                    <ap-input
                        class="ap-margin-remove-bottom"
                        type="text"
                        :readonly="isLoading('store')"
                        :label="'TABLE NAME'"
                        :placeholder="'ex. VEHICLES'"
                        v-model="keyword" />
                    <small class="ap-text-italic">
                        Note: Press ENTER to save
                    </small>
                </fieldset>
            </form>
                
            <div class="ap-margin-small-top"
                v-if="form.tables.length">

                <p class="ap-text-italic">
                    SAVED TABLES:
                </p>

                <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-xsmall-top"
                    v-for="(item, tbIndex) in form.tables"
                    :key="tbIndex">
                    
                    <ap-grid :gutter="'small'"
                        class="ap-flex-middle ap-margin-remove-bottom">
                        <div class="ap-width-expand">
                            <p class="ap-text-bold">
                                {{item.label.toUpperCase()}}
                            </p>
                        </div>
                        <div class="ap-text-right">
                            <a class="ap-link-reset ap-point ap-text-danger"
                                @click="remove(tbIndex)">
                                <i class="lni lni-close"></i>
                            </a>
                        </div>
                    </ap-grid>

                    <form class="ap-form-stacked"
                        @submit.prevent="addField(tbIndex)">
                        <fieldset>
                            <ap-input
                                class="ap-margin-remove-bottom"
                                type="text"
                                :readonly="isLoading('store')"
                                :label="'Field Names'"
                                :placeholder="'ex. PLATE #'"
                                v-model="item.fieldName" />
                            <small class="ap-text-italic">
                                Note: Press ENTER to save
                            </small>
                        </fieldset>
                    </form>

                    <div class="ap-margin-top"
                        v-if="item.fields.length">
                        <table border="1" class="ap-table ap-table-divider ap-table-small">
                            <tr>
                                <td v-for="(field, fIndex) in item.fields"
                                    :key="fIndex"
                                    style="font-size: 9px;">
                                    <small class="ap-text-bold ap-margin-small-left">
                                        {{field.label}}
                                    </small>
                                    <a class="ap-link-reset ap-point"
                                        @click="removeField(fIndex, tbIndex)">
                                        <i class="lni lni-close"></i>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="ap-margin-small-top"
                        v-else>
                        <p class="ap-text-italic">
                            No fields yet
                        </p>
                    </div>
                </div>
            </div>
            <div class="ap-card ap-card-body ap-card-small ap-card-default ap-padding-small ap-margin-top" v-else>
                <p class="ap-text-italic">No table yet</p>
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
            fieldName: '',
        };
    },

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
        add()
        {
            let checking = this.form.tables.find(row => row.key == Text.wordToValidKey(this.keyword, 'table'));

            if (checking) return Toast.error({
                message: 'Table name already exists.'
            });

            let input = {
                type: 'table',
                label: this.keyword.toUpperCase(),
                key: Text.wordToValidKey(this.keyword, 'table'),
                fields: [],
                values: [],
                fieldName: '',
            };
            
            this.form.tables.push(input);

            this.keyword = '';
        },

        remove(index)
        {
            this.form.tables.splice(index, 1);
        },

        addField(index)
        {
            let table = this.form.tables[index];

            let field = {
                label: table.fieldName.toUpperCase(),
                key: Text.wordToValidKey(table.fieldName, 'field'),
            };

            table.fields.push(field);

            table.fieldName = '';
        },

        removeField(fIndex, tbIndex)
        {
            this.form.tables[tbIndex].fields.splice(fIndex, 1);
        },
        
        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    }
};
</script>