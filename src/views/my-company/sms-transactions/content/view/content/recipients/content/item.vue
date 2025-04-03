<template>
    <li>
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand">
                <h5 class="ap-text-bold ap-margin-remove">
                    {{item.mobile_number}}
                </h5>

                <div class="ap-margin-small-top">
                    <small class="ap-text-italic">
                        <span class="badge" :class="statusClass">{{item.status.name}}</span>
                        <span v-if="item.status.id == 2">{{item.sent_at}}</span>
                    </small>
                </div>
                
            </div>
            <div class="ap-text-right">
                <ap-button
                    v-if="smsTransaction.status.id == 2 && [1,3].includes(item.status.id)"
                    :size="'small'"
                    :color="'primary'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('send')">
                    SEND
                </ap-button>
                
                <span class="ap-margin-small-left ap-margin-small-right">
                    |
                </span>

                <ap-button
                    v-if="[1,3].includes(item.status.id)"
                    :size="'small'"
                    :color="'warning'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('update')">
                    UPDATE MOBILE NO.
                </ap-button>
                <ap-button
                    v-if="[1,3].includes(item.status.id)"
                    :size="'small'"
                    :color="'danger'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>
        </ap-grid>

        <div class="ap-margin-small-top"
            v-if="item.status.id == 3">
            <small>
                REMARKS: <span class="ap-text-italic ap-text-danger">{{item.failure_message}}</span>
            </small>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        ...mapGetters({
            smsTransaction: 'myCompanySmsTransaction/selected',
            isLoading: 'myCompanySmsTransactionRecipient/isLoading'
        }),

        statusClass()
        {
            return {
                'bg-secondary': this.item.status.id == 1,
                'bg-success': this.item.status.id == 2,
                'bg-danger': this.item.status.id == 3,
                'bg-warning': this.item.status.id == 4,
            };
        },
    },

    methods:
    {
        ...mapActions({
            select: 'myCompanySmsTransactionRecipient/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    }
};
</script>