<template>
    <div class="ap-card ap-card-body ap-card-default">
        <small class="ap-text-italic">
            Note: You can use available inputs below to be included in the content of the document.
        </small>

        <div class="ap-margin-top">
            <div class="ap-margin">
                <div>
                    <small class="ap-text-bold ap-text-italic">
                        Title & Salutation inputs:
                    </small>
                </div>

                <div class="ap-inline">
                    <ap-button
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent('content_title')">
                        TITLE
                    </ap-button>
                    <ap-button
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent('content_salutation')">
                        SALUTATION
                    </ap-button>
                </div>
            </div>
            
            <div class="ap-margin">
                <div>
                    <small class="ap-text-bold ap-text-italic">
                        {{availableLabel}} inputs:
                    </small>
                </div>
                <div class="ap-inline">
                    <ap-button
                        v-for="(input, aIndex) in availableInputs"
                        :key="aIndex"
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent(input.key)">
                        {{input.label}}
                    </ap-button>
                </div>
            </div>

            <div class="ap-margin"
                v-if="form.inputs.length">
                <div>
                    <small class="ap-text-bold ap-text-italic">
                        Words/Phrases inputs:
                    </small>
                </div>
                <div class="ap-inline">
                    <ap-button
                        v-for="(input, index) in form.inputs"
                        :key="index"
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent(input.key)">
                        {{input.label}}
                    </ap-button>
                </div>
            </div>

            <div class="ap-margin"
                v-if="form.inputs.length">
                <div>
                    <small class="ap-text-bold ap-text-italic">
                        Table inputs:
                    </small>
                </div>
                <div class="ap-inline">
                    <ap-button
                        v-for="(input, index) in form.tables"
                        :key="index"
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent(input.key)">
                        {{input.label}}
                    </ap-button>
                </div>
            </div>

            <div class="ap-margin">
                <div>
                    <small class="ap-text-bold ap-text-italic">
                        Object inputs:
                    </small>
                </div>

                <div class="ap-inline">
                    <ap-button
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent('box_unchecked')">
                        Box (Unchecked)
                    </ap-button>
                    <ap-button
                        type="button"
                        class="ap-margin-xsmall-top ap-margin-xsmall-right"
                        :color="'default'"
                        :size="'small'"
                        :outline="true"
                        @click="addContent('box_checked')">
                        Box (Checked)
                    </ap-button>
                </div>
            </div>

            <vue-editor
                v-model="form.content.body"
                :editorToolbar="customToolbar" />

            <small class="ap-text-bold ap-text-danger"
                v-if="hasError('content.body')">
                <i class="bx bx-info-circle"></i> {{errors['content.body'][0]}}
            </small>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Form } from '@/utils';

import { VueEditor } from 'vue2-editor';

export default
{
    components:
    {
        VueEditor,
    },

    data()
    {
        return {
            customToolbar: [
                ["bold", "italic", "underline"],
                [{ align: "" }, { align: "center" }, { align: "right"}, { align: "justify"}],
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ color: [] }]
            ],
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

        template()
        {
            return this.$parent.$data.template;
        },

        availableInputs()
        {
            return this.$parent.$data.beneficiaryInputs;
        },

        availableLabel()
        {
            return 'Beneficiary';
        }
    },

    methods:
    {
        addContent(value)
        {
            let content = `{{${value}}}`;

            this.insertTextAtCaret(content);
        },

        insertTextAtCaret(text) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            range.deleteContents();
            let node = document.createTextNode(text);
            range.insertNode(node);

            for(let position = 0; position != text.length; position++)
            {
                selection.modify("move", "right", "character");
            };
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
