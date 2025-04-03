<template>
    <div class="ap-animate ap-animate-fade-in">

        <div v-if="!barangaysLoading">
            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-margin-top"
                    v-for="(item, index) in barangays"
                    :key="index">
                    <router-link
                        :to="`/company/monitoring/residents?barangay=${item.id}`">
                        <div class="ap-card ap-card-body ap-card-white ap-card-hover ap-point">

                            <ap-grid :gutter="'small'">
                                <div class="ap-width-fit-content">
                                    <ap-avatar
                                        :src="item.city_logo"
                                        :label="'AA'"
                                        :size="'medium'" />
                                    <ap-avatar
                                        :src="item.barangay_logo"
                                        :label="'AA'"
                                        :size="'medium'" />
                                </div>
                                <div class="ap-width-expand">
                                    <p class="ap-text-bold ap-margin-remove">
                                        {{ item.province_name }}, {{ item.city_name }}
                                    </p>
                                    <h4 class="ap-text-bold ap-margin-remove">
                                        BRGY {{ item.barangay_name }}
                                    </h4>
                                </div>
                            </ap-grid>

                        </div>
                    </router-link>
                    
                </div>
            </ap-grid>

        </div>

        <placeholder-component
            v-else />

    </div>
</template>

<script>
import Http from '@/services';

import PlaceholderComponent from './content/placeholder';

export default
{
    components:
    {
        PlaceholderComponent,
    },

    data()
    {
        return {
            barangays: [],
            barangaysLoading: false,
        };
    },

    created()
    {
        this.load();
    },

    methods:
    {
        async load()
        {
            this.barangaysLoading = true;

            const response = await Http.get(`/my-company/monitoring/barangays`);

            this.barangaysLoading = false;

            if (response.status == 200)
            {
                this.barangays = response.data.data;
            }
        }
    }

};
</script>
