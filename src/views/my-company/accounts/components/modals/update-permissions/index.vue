<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updatePermissionsModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                Account Permissions of <span class="ap-text-bold">{{account.account.full_name}}</span>
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top"
                v-if="!isLoading('modules')">
                <table class="ap-table ap-table-divider">
                    <thead>
                        <tr>
                            <th style="width: 25%;">
                                <small>MODULE</small>
                            </th>
                            <th style="width: 15%;">
                                <small>ACCESS</small>
                            </th>
                            <th style="width: 15%;">
                                <small>INDEX</small>
                            </th>
                            <th style="width: 15%;">
                                <small>CREATE</small>
                            </th>
                            <th style="width: 15%;">
                                <small>UPDATE</small>
                            </th>
                            <th style="width: 15%;">
                                <small>DELETE</small>
                            </th>
                        </tr>
                        
                    </thead>

                    <tbody>

                        <item-component
                            v-for="(item, index) in modules"
                            :key="index"
                            :item="item" />

                    </tbody>
                    
                </table>

            </div>

            <div class="ap-margin-top" v-else>
                <ap-placeholder
                    class="ap-margin-small-top"
                    v-for="index in 5"
                    :key="index"
                    :size="'medium'" />
            </div>

            <div class="ap-margin-top ap-text-right">
                <ap-button
                    type="button"
                    class="ap-margin-small-right"
                    :rounded="true"
                    @click="closeModal()">
                    Cancel
                </ap-button>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form } from '@/utils';

import ItemComponent from './components/item';

export default
{
    components:
    {
        ItemComponent,
    },

    created()
    {
        this.loadModules();
    },

    computed:
    {
        ...mapGetters({
            account: 'myCompanyAccount/selected',
            modules: 'myCompanyAccount/modules',
            isLoading: 'myCompanyAccount/isLoading',
        }),

        updatePermissionsModal()
        {
            return this.$parent.$data.updatePermissionsModal;
        }
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'myCompanyAccount/loadPrerequisite',
        }),

        async loadModules()
        {
            this.loadPrerequisite({
                url: `/my-company/account/module/options`,
                action: 'modules'
            });
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('updatePermissions', false);
        },
    },

    watch:
    {
        updatePermissionsModal(val)
        {
            if (val) this.loadModules();
        },
    },
};
</script>
