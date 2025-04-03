<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">
                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <i class="bx bx-file" style="font-size: 26px;"></i>
                    </div>
                    <div class="ap-width-expand">
                        <h5 class="ap-margin-remove">
                            {{item.code}}
                        </h5>
                        <p class="ap-margin-remove">
                            {{item.name}}
                        </p>

                        <div class="ap-margin-small-top">
                            <small class="ap-text-italic">
                                VALID UNTIL: <span class="ap-text-bold" :class="{ 'ap-text-danger': isExpired }">{{expirationDate}}</span>
                            </small>
                        </div>
                    </div>
                </ap-grid>
            </div>
            <div class="ap-text-right@m">
                <div>
                   
                </div>
                <div>
                    <small class="ap-text-italic">
                        <ap-moment :datetime="item.created_at" />
                    </small>
                </div>
                
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
        issuanceDate()
        {
            return Dater.format(this.item.issuance_date);
        },

        expirationDate()
        {
            return Dater.format(this.item.expiration_date);
        },

        isExpired()
        {
            return Dater.isExpired(this.item.expiration_date); 
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyBeneficiaryDocument/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
