<template>
    <vue-google-heatmap
        :lat="centerLatNumberFormat"
        :lng="centerLongNumberFormat"
        :points="points"
        :width="width"
        :height="height"
        :initialZoom="initialZoom"
        :mapType="mapType"
        :options="{
            radius: radius,
            opacity: opacity
        }" />
</template>
    
<script>
import Vue from 'vue';
import VueGoogleHeatmap from 'vue-google-heatmap';

export default
{
    props:
    {
        apiKey:
        {
            type:  String,
            default: null,
        },

        points:
        {
            type: Array,
            default: [],
        },

        centerLat:
        {
            type: [String, Number],
            default: () => 14.8386
        },

        centerLong:
        {
            type: [String, Number],
            default: () => 120.2842
        },

        width:
        {
            type: [String, Number],
            default: () => '100%'
        },

        height:
        {
            type: [String, Number],
            default: () => '100%'
        },

        initialZoom:
        {
            type: Number,
            default: () => 13,
        },

        mapType:
        {
            type: String,
            default: () => 'roadmap'
        },

        radius:
        {
            type: Number,
            default: () => 10
        },

        opacity:
        {
            type: Number,
            default: () => 0.60  
        },

        gradient:
        {
            type: Array,
            default: () => [
                "rgba(0, 255, 255, 0)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 191, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 63, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(0, 0, 223, 1)",
                "rgba(0, 0, 191, 1)",
                "rgba(0, 0, 159, 1)",
                "rgba(0, 0, 127, 1)",
                "rgba(63, 0, 91, 1)",
                "rgba(127, 0, 63, 1)",
                "rgba(191, 0, 31, 1)",
                "rgba(255, 0, 0, 1)",
            ]
        }
    },

    created()
    {
        Vue.use(VueGoogleHeatmap, {
            apiKey: this.apiKey
        });
    },

    computed:
    {
        centerLatNumberFormat()
        {
            return Number(this.centerLat);
        },

        centerLongNumberFormat()
        {
            return Number(this.centerLong);
        },

        mapStyle()
        {
            return {
                styles: {}
            }
        }
    },
}
    
</script>