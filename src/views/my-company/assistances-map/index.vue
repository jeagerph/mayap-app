<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">

                <div class="ap-card ap-card-body ap-card-white ap-box-shadow-medium ap-card-content-custom">

                    <map-component v-if="showMap == 'map'" />
                </div>
                

                
            </div>
            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">

                <barangay-component />

            </div>
        </ap-grid>
        
    </div>
</template>

<script>
import MapComponent from './content/map';
import BarangayComponent from './content/barangay';

export default
{
    components:
    {
        MapComponent,
        BarangayComponent,
    },

    data()
    {
        return {
            showMap: 'map',
        };
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