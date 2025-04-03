<template>

    <div class="card radius-10 bg-gradient" :class="cardBackground">
        <div class="card-body">
            <ap-grid>
                <div class="ap-width-expand">
                <small v-if="title === 'MESSAGES'" class="ap-text-inverse"> {{ 'SMS' }} </small>
                <small v-else class="ap-text-inverse"> {{ title }} </small>
                <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!getSummaryLoading"
                >
                    <span>{{ total }}</span>
                </h4>
                <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                </div>
                </div>
                <div class="ap-text-right">
                <div class="ap-text-inverse ms-auto font-35">
                    <i :class='icon'></i>
                </div>
                </div>
            </ap-grid>

            <hr class="ap-text-inverse" />

            <ap-grid>
                <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                <h5 class="ap-text-inverse" v-if="!getSummaryLoading">
                    <span>{{month}}</span>
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
            </ap-grid>

            <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!getSummaryLoading"
                >
                    <span>{{year}}</span>

                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
            </ap-grid>
        </div>
    </div>


</template>

<script>

    export default {

        props: {
            month: {
                type: Number,
                required: true,
            },
            total: { 
                type: Number, 
                required: true
            },
            year : {
                type: Number,
                required: true,
            },
            cardBackground: {
                type: String,
                required: true,
            },
            title : {
                type : String,
                required : true
            },
            getSummaryLoading : {
                type : Boolean,
                required : true
            },
            icon : {
                type : String,
                required : true
            }
        }
    };

</script>
