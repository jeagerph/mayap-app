<template>
    <li>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <router-link
                    :to="`/company/beneficiaries/${item.beneficiary.slug.code}`">
                    <h5 class="ap-text-primary ap-text-bold">
                        {{ beneficiary.full_name }}
                    </h5>
                </router-link>
                
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    INCENTIVE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    ({{ item.mode.name }}) {{ item.points }} pts
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    DATE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ incentiveDate }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l ap-text-right@m">

                <div class="ap-margin-top">
                    <!-- <ap-button
                        class="ap-margin-xsmall-right"
                        :size="'small'"
                        :color="'warning'"
                        :outline="true"
                        @click="openModal('update')">
                        EDIT
                    </ap-button> -->

                    <ap-button
                        :size="'small'"
                        :color="'danger'"
                        :outline="true"
                        @click="openModal('delete')">
                        DELETE
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
                    Created by {{ item.created_by.full_name }}
                    &middot;
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
        
        incentiveDate()
        {
            return Dater.format(this.item.incentive_date); 
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyIncentive/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
