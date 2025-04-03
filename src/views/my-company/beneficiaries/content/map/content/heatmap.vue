<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">

        <ap-heatmap
            v-if="!beneficiariesLoading"
            :apiKey="mapSetting.api_key"
            :centerLat="mapSetting.latitude"
            :centerLong="mapSetting.longitude"
            :width="'100%'"
            :height="900"
            :initialZoom="10"
            :radius="30"
            :opacity="0.80"
            :points="points">

        </ap-heatmap>

        <div class="ap-text-center ap-margin-medium-top"
            v-if="beneficiariesLoading">
            <ap-loader
                :size="'large'" />

            <p>
                Loading ...
            </p>
        </div>

    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

export default
{
    data()
    {
        return {
            points: [
                // {lat: 15.45283608887284, lng: 120.59809288908839},
            ],

            beneficiaries: [],
            beneficiariesLoading: false,
        }
    },

    created()
    {
        this.loadBeneficiaries();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        mapSetting()
        {
            return this.company.map_setting;
        },
    },

    methods:
    {
        async loadBeneficiaries()
        {
            if (this.beneficiaries.length) return false;

            this.beneficiariesLoading = true;

            const response = await Http.get(`/my-company/beneficiaries/locations/list`);

            this.beneficiariesLoading = false;

            if (response.status == 200)
            {
                this.beneficiaries = response.data;

                this.beneficiaries.forEach(row => {
                    if (row.latitude && row.longitude)
                    {
                        this.points.push({
                            lat: parseFloat(row.latitude),
                            lng: parseFloat(row.longitude)
                        })
                    }
                })
                
            }
        },
    },
}

</script>