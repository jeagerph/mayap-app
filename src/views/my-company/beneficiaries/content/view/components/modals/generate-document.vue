<template>
    <ap-modal
        :isOpen.sync="$parent.$data.generateDocumentModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Generate Document
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p class="ap-text-italic">
                    Select a document to generate for <span class="ap-text-bold">{{fullName}}</span>:
                </p>
                
                <div v-if="!templatesLoading">
                    <ul class="ap-list ap-list-divider"
                        v-if="templates.length">
                        <li v-for="(item, index) in templates"
                            :key="index"
                            class="ap-point ap-text-bold"
                            @click="redirect(item.slug.code)">
                            <i class="lni lni-empty-file ap-margin-right"></i> {{item.name}}
                        </li>
                    </ul>
                    <ap-card-empty
                        v-else
                        :label="'no available templates'" />
                </div>
                <div v-else
                    class="ap-text-center">
                    <ap-loader
                        :size="'large'" />
                    <p class="ap-text-italic">
                        Loading templates...
                    </p>
                </div>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        type="button"
                        class="ap-margin-small-right"
                        :rounded="true"
                        @click="closeModal()">
                        Close
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},

            templates: [],
            templatesLoading: false,
        };
    },

    computed:
    {
        ...mapGetters({
            // templates: 'companyBeneficiary/templates',
            beneficiary: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
        }),

        fullName()
        {
            return `${this.beneficiary.full_name}`;
        },

        generateDocumentModal()
        {
            return this.$parent.$data.generateDocumentModal;
        },
    },

    methods:
    {
        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('generateDocument', false);
        },
    },
};
</script>
