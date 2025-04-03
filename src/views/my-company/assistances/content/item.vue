<template>
    <li>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <h5 class="ap-text-bold ap-margin-remove-bottom">
                    {{ beneficiary.full_name }}
                </h5>

                <a class="ap-point"
                    @click="openModal('view')">
                    <div class="badge ap-margin-xsmall-top"
                        :class="apCardBackground">
                        <p class="ap-margin-remove ap-text-inverse" style="font-size: 14px;">
                            <i class="bx bx-user-check ap-text-inverse"></i>
                            {{ beneficiary.assistances_count }} assistance
                        </p>
                    </div>
                </a>
                

                <div class="ap-margin-top">
                    <router-link
                    class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded"
                    :to="`/company/beneficiaries/${item.beneficiary.slug.code}`">
                        SEE PROFILE
                    </router-link>

                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('create')">
                        <i class="lni lni-plus"></i> NEW ASSISTANCE
                    </ap-button>
                </div>
                
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-width-1-5@l">
                <small class="ap-text-bold">
                    TYPE OF ASSISTANCE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ item.assistance_type }}
                </p>

                <p class="ap-margin-small-top">
                    AMOUNT: <span class="ap-text-bold">{{ assistanceAmount }}</span>
                </p>

                <p class="ap-margin-small-top">
                    ASSISTANCE FROM: <span class="ap-text-bold">{{ item.assistance_from }}</span>
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

                <p class="ap-margin-small-top ap-margin-remove-bottom"
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
import { mapActions, mapGetters } from 'vuex';

import { Dater, Text } from '@/utils';

export default
{
    props:
    {
        item: Object,
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
        },

        assistanceAmount()
        {
            return Text.currency(this.item.assistance_amount);
        },

        apCardBackground()
        {
            if (this.company.province_id == '0314') return 'ap-card-orange';

            return 'bg-primary';
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyAssistance/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
