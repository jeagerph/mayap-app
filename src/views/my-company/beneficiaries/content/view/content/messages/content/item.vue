<template>
    <li>
        <div class="ap-card ap-card-body ap-padding-small ap-card-hover">

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <h5 class="ap-margin-remove">
                        {{item.mobile_number}}
                    </h5>

                    <p class="ap-margin-remove">
                        {{ messageType }}
                    </p>
                </div>
                <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                    <small class="ap-text-bold">
                        DATE
                    </small>

                    <p class="ap-text-bold ap-margin-remove">
                        {{ messageDate }}
                    </p>
                </div>
                <div class="p-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-text-right@m">
                    <div>
                        <small class="ap-text-italic">
                            Initiated by {{createdBy}}
                        </small>
                    </div>
                    <div>
                        <small class="ap-text-italic">
                            <ap-moment :datetime="item.created_at" />
                        </small>
                    </div>
                </div>
            </ap-grid>

            <div class="ap-margin-top">
                <p class="ap-margin-remove">
                    <span class="ap-text-bold ap-text-italic">MESSAGE:</span> {{ item.message }}
                </p>
            </div>

        </div>
    </li>
</template>

<script>

import { Dater } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        messageDate()
        {
            return Dater.format(this.item.message_date);
        },

        messageType()
        {
            let label = 'REGULAR SMS';

            if (this.item.message_type.id == 2)
            {
                label = this.item.message_sender_name;
            }

            return label;
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