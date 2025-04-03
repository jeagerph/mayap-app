<template>
     <div class="card card-body radius-10 ap-animate ap-animate-fade-in">
        <ap-grid>
            <div class="ap-width-expand">
                <h5 class="ap-text-bold">
                    SERVER CAPACITY
                </h5>
            </div>
            <div class="ap-text-right">
                <div class="widgets-icons text-primary ms-auto">
                    <i class="bx bxs-data"></i>
                </div>
            </div>
        </ap-grid>
        
        <hr>

        <div class="ap-margin-top ap-card-scroll"
            style="max-height: 10vh;"
            v-if="!barangaysLoading">

             <ul class="ap-list ap-list-divider-bottom"
                v-if="barangays.length">

                <item-component
                    v-for="(item, index) in sortedBarangays"
                    :key="index"
                    :item="item" />
            </ul>

            <ap-card-empty
                v-else
                :label="emptyLabel" />
        </div>
        <placeholder-component
            v-else
            v-for="index in 5"
            :key="index" />
    </div>
</template>

<script>
import Http from '@/services';

import { Text } from '@/utils';

import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

export default
{
    components:
    {
        ItemComponent,
        PlaceholderComponent,
    },

    data()
    {
        return {
            barangaysLoading: false,
            barangays: [],
        };
    },

    created()
    {
        this.load();
    },
    
    computed:
    {
        emptyLabel()
        {
            return 'no record found';
        },

        sortedBarangays()
        {
            return this.barangays.sort((comparison1, comparison2) => {
                return comparison1.remaining_capacity - comparison2.remaining_capacity;
            });
        }
    },

    methods:
    {
        async load()
        {
            this.barangaysLoading = true;

            const response = await Http.get(`/administration/dashboard/barangays/server/status`);

            this.barangaysLoading = false;

            if (response.status == 200)
            {
                this.barangays = response.data;
            }
        },
    },
};
</script>
