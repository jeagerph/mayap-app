<template>
    <li>
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <h5 class="ap-margin-remove ap-point">
                    {{fullName}}
                </h5>
                <p class="ap-margin-remove">
                    {{ item.code }}
                    &middot;
                    {{item.gender}}
                    &middot;
                    {{age}} yrs old
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                <!-- <div>
                    <span class="badge bg-secondary" :style="{ padding: '5px 5px'}">
                        BRGY {{item.barangay}} &middot; {{item.city}}
                    </span>
                </div> -->

                <a class="ap-link-reset"
                    target="new"
                    :href="`/company/beneficiaries/${item.slugCode}/network`">
                    <div class="badge ap-margin-top"
                        :class="apCardBackground"
                        :data-tooltip="`${item.total} networks`">
                        <p class="ap-margin-remove ap-text-inverse" style="font-size: 14px;">
                            <i class="lni lni-network ap-text-inverse"></i>
                            {{ item.total }} network
                        </p>
                    </div>
                </a>
            </div>
        </ap-grid>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';

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
            beneficiary: 'companyBeneficiary/selected',
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        fullName()
        {
            return `${this.item.full_name}`;
        },

        age()
        {
            return Dater.age(this.item.date_of_birth);
        },

        apCardBackground()
        {
            if (this.company.province_id == '0314') return 'ap-card-orange';

            return 'bg-primary';
        },

    },
}
</script>