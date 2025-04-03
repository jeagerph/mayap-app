<template>
    <div>
        <div class="ap-margin-top"
            v-if="!isLoading('modules') && !isLoading('show')">
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

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemComponent from './components/item';

import { Toast } from '@/utils';

export default
{
    name: 'Permissions',

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
            account: 'adminAccount/selected',
            modules: 'adminAccount/modules',
            isLoading: 'adminAccount/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            loadPrerequisite: 'adminAccount/loadPrerequisite',
        }),

        async loadModules()
        {
            if (!this.modules.length)
            {
                this.loadPrerequisite({
                    url: `/administration/account/${this.$route.params.code}/modules`,
                    action: 'modules'
                });
            }
        },
    },
};
</script>
