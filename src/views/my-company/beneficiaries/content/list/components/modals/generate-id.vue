<template>
    <ap-modal
        :isOpen.sync="$parent.$data.generateIDModal"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Generate ID
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">
                <p class="ap-text-italic">
                    Select a template to generate for <span class="ap-text-bold">{{selected.full_name}}</span>:
                </p>
                
                <p class="ap-text-bold ap-text-italic">
                    Available ID Templates:
                </p>

                <div v-if="!isLoading('idTemplates')"
                    class="ap-custom-scroll">
                    <ul class="ap-list ap-list-divider">

                        <item-component
                            v-for="(item, index) in idTemplates"
                            :key="index"
                            :item="item" />

                    </ul>
                </div>
                <div v-else
                    class="ap-margin-top ap-text-center">

                    <ap-loader
                        :size="'medium'" />

                    <p>
                        LOADING...
                    </p>
                </div>

                <div class="ap-margin ap-text-right">
                    <ap-button
                        type="button"
                        class="ap-margin-small-right"
                        :rounded="true"
                        @click="closeModal()">
                        Cancel
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form } from '@/utils';

import ItemComponent from './generate-id-item';

export default
{
    components:
    {
        ItemComponent,
    },

    data()
    {
        return {
            errors: {},

            submitLoading: false,
            downloadLoading: false,
        };
    },

    created()
    {
        this.loadTemplates();
    },

    computed:
    {
        ...mapGetters({
            selected: 'companyBeneficiary/selected',
            isLoading: 'companyBeneficiary/isLoading',
            idTemplates: 'companyBeneficiary/idTemplates'
        }),

        generateIdModal()
        {
            return this.$parent.$data.generateIDModal;
        },
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'companyBeneficiary/loadPrerequisite',
        }),

        async loadTemplates()
        {
            this.loadPrerequisite({
                url: `/my-company/beneficiary/id-template/options`,
                action: 'idTemplates'
            });
        }, 

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('generateID', false);
        },
    },

    watch:
    {
        generateIdModal(val)
        {
            if (val) this.loadTemplates();
        }
    }
};
</script>

<style scoped>
    .ap-custom-scroll {
        height: 200px;
        overflow: hidden;
    }
    .ap-custom-scroll:hover {
        overflow-y: scroll;
    }
</style>
