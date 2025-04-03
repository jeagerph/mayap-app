<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover">

            <ap-grid :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">

                    <audio controls style="width: 250px; height: 50px;">
                        <source :src="`${transaction.recording_url}.mp3`">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small class="ap-text-bold">
                        MOBILE NUMBER
                    </small>

                    <h5 class="ap-margin-remove">
                        {{item.mobile_number}}
                    </h5>
                </div>
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small class="ap-text-bold">
                        DATE
                    </small>

                    <p class="ap-text-bold ap-margin-remove">
                        {{ callDate }}
                    </p>
                </div>
            </ap-grid>

            <div class="ap-text-right">
                <small class="ap-text-italic">
                    Initiated by {{createdBy}}
                    &middot;
                    <ap-moment :datetime="item.created_at" />
                </small>
            </div>
            

        </div>
    </li>
</template>

<script>

import { Dater, Text } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        transaction()
        {
            return this.item.call_transaction;
        },

        recordingDuration()
        {
            return Text.readableTimeRecording(this.transaction.recording_duration);
        },

        statusClass()
        {
            return {
                'bg-secondary': this.item.status.id == 1,
                'bg-success': this.item.status.id == 2,
                'bg-warning': this.item.status.id == 3,
            }
        },

        callDate()
        {
            return Dater.format(this.item.call_date);
        },

        createdBy()
        {
            return `${this.item.created_by.full_name}`
        },
    },
};
</script>

<style scoped>
    .ap-card-scroll-custom {
        height: 200px;
        overflow: hidden;
    }
    .ap-card-scroll-custom:hover {
        overflow-y: scroll;
    }
</style>