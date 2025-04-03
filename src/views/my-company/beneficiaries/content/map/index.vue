<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">

                <div class="ap-card ap-card-body ap-card-white ap-box-shadow-medium ap-card-content-custom">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                            <h5 class="ap-text-bold ap-text-primary">
                                <span v-if="showMap == 'heatmap'">
                                    MAP VISUALIZATION
                                </span>
                                <span v-else-if="showMap == 'map'">
                                    MAP LOCATION
                                </span>
                                <span v-else-if="showMap == 'voterType'">
                                    VOTER TYPE
                                </span>
                            </h5>
                        </div>
                        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                            <div>
                                <ap-button
                                    :size="'small'"
                                    :color="apButtonBackground"
                                    :outline="showMap != 'map'"
                                    :rounded="true"
                                    @click="toggleMap('map')">
                                    MAP LOCATION
                                </ap-button>
                                <ap-button
                                    :size="'small'"
                                    :color="apButtonBackground"
                                    :outline="showMap != 'voterType'"
                                    :rounded="true"
                                    @click="toggleMap('voterType')">
                                    MAP VOTER
                                </ap-button>
                                <ap-button
                                    :size="'small'"
                                    :color="apButtonBackground"
                                    :outline="showMap != 'heatmap'"
                                    :rounded="true"
                                    @click="toggleMap('heatmap')">
                                    MAP VISUALIZATION
                                </ap-button>
                                
                            </div>
                        </div>
                    </ap-grid>

                    <heatmap-component v-if="showMap == 'heatmap'" />

                    <map-component v-if="showMap == 'map'" />

                    <voter-type-component v-if="showMap == 'voterType'" />
                </div>
                

                
            </div>
            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">

                <barangay-component />

            </div>
        </ap-grid>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import MapComponent from './content/map';
import HeatmapComponent from './content/heatmap';
import VoterTypeComponent from './content/voter-type';
import BarangayComponent from './content/barangay';

export default
{
    components:
    {
        MapComponent,
        HeatmapComponent,
        VoterTypeComponent,
        BarangayComponent,
    },

    data()
    {
        return {
            showMap: 'map',
        };
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyBeneficiary/isLoading',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        }
    },

    methods:
    {
        toggleMap(name)
        {
            this.showMap = name;
        },
    }
}
</script>

<style scoped>

.ap-card-content-custom {
    height: 1035px;
}
</style>