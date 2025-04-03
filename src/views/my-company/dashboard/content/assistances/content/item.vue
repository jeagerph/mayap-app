<template>
    <li>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <h5>
                    {{ beneficiary.full_name }}
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <small class="ap-text-bold">
                    TYPE OF ASSISTANCE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ item.assistance_type }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <small class="ap-text-bold">
                    REQUESTED DATE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ assistanceDate }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <small class="ap-text-bold">
                    DATE ASSISTED
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    <span v-if="item.is_assisted">
                        {{ assistedDate }}
                    </span>
                    <span v-else
                        class="ap-text-italic">
                        Not yet assisted
                    </span>
                </p>

                <p class="ap-margin-small-top"
                    v-if="item.is_assisted">
                    ASSISTED BY: <span class="ap-text-bold">{{ item.assisted_by }}</span>
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l ap-text-right@m">

                <div>
                    <div class="badge"
                        v-show="item.is_assisted"
                        :class="{ 'bg-success': item.is_assisted }">
                        ASSISTED
                    </div>
                </div>

                <div class="ap-margin-top">
                    <ap-button
                        class="ap-margin-xsmall-right"
                        :size="'small'"
                        :color="'warning'"
                        :outline="true"
                        @click="openModal('update')">
                        EDIT
                    </ap-button>
                </div>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <small class="ap-text-italic"
                    v-if="item.remarks">
                    <span class="ap-text-bold"> 
                        Other Remarks:
                    </span> {{ item.remarks }}
                </small>
            </div>
            <div class="ap-text-right@m">
                <small class="ap-text-italic">
                    <ap-moment :datetime="item.created_at" />
                </small>
            </div>
        </ap-grid>

        
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import { Dater } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        beneficiary()
        {
            return this.item.beneficiary;
        },
        
        assistanceDate()
        {
            return Dater.format(this.item.assistance_date); 
        },

        assistedDate()
        {
            return Dater.format(this.item.assisted_date);
        }
    },

    methods:
    {
        ...mapActions({
            select: 'companyDashboardAssistance/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
