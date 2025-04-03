<template>
    <li>

        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <h5>
                    <i class="bx bx-award" style="font-size: 26px;"></i>
                    <span>
                        {{ item.mode.id == 1 ? '+':'-' }}
                    </span>
                    {{item.points}} points
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <small class="ap-text-bold">
                    DATE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ incentiveDate }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-text-right@m">
                <ap-button
                    :size="'small'"
                    :color="'danger'"
                    :outline="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <small class="ap-text-italic">
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
        incentiveDate()
        {
            return Dater.format(this.item.incentive_date); 
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyBeneficiaryIncentive/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
