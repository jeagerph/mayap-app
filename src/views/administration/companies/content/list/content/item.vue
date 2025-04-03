<template>
    <li>
        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-2-5@m ap-wdith-2-5@l">
                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <router-link
                            class="ap-link-reset"
                            :to="`/administration/companies/${item.slug.code}`">
                            <ap-avatar
                                :shape="'circle'"
                                :src="item.logo"
                                :label="'L'" />
                            <ap-avatar
                                :shape="'circle'"
                                :src="item.sub_logo"
                                :label="'SL'" />
                        </router-link>
                    </div>
                    <div class="ap-width-expand">
                        <router-link
                            :to="`/administration/companies/${slugCode}`">
                            <h4 class="ap-margin-remove">
                                {{item.name}}
                            </h4>
                        </router-link>
                    </div>
                </ap-grid>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-wdith-1-5@l">
                <small class="ap-text-bold">
                    RUNNING BALANCE
                </small>

                <h5>
                    {{ runningBalance }}
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-wdith-1-5@l">
                <small class="ap-text-bold">
                    SMS CREDIT BALANCE
                </small>

                <h5>
                    {{ smsCreditBalance }}
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-5@m ap-wdith-1-5@l ap-text-right@m">
                <a class="ap-link-reset ap-point"
                    @click="openModal('updateStatus')">
                    <div class="badge"
                        :class="statusClass">
                        {{statusName}}
                    </div>
                </a>

                <div class="ap-margin-top">
                    <router-link
                        :to="`/administration/companies/${slugCode}/edit`"
                        class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded">
                        <i class="lni lni-pencil"></i>
                    </router-link>
                    <ap-button
                        :color="'danger'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('delete')">
                        <i class="lni lni-trash"></i>
                    </ap-button>
                </div>
                
            </div>
        </ap-grid>
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import { Text } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        slugCode()
        {
            return this.item.slug
                ? this.item.slug.code
                : 'DELETED'
        },

        runningBalance()
        {
            return Text.currency(this.item.running_balance);
        },

        smsCreditBalance()
        {
            return Text.currency(this.item.sms_credit);
        },

        statusClass()
        {
            return {
                'bg-warning': !this.item.status,
                'bg-success': this.item.status
            };
        },

        statusName()
        {
            return this.item.status
                ? 'ACTIVE'
                : 'SUSPENDED';
        },

    },

    methods:
    {
        ...mapActions({
            select: 'adminCompany/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
