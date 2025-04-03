<template>
    <div>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <p class="ap-text-bold ap-text-primary ap-margin-remove">
                    RECIPIENTS
                </p>

                <p class="ap-margin-small-top"
                    v-if="!isLoading('index') && items.length">
                    <ap-pagination-showing
                        :page="page"/>
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right">
                <div v-if="!isLoading('index')">
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="activeFilter != 'all'"
                        @click="onSet('all')">
                        ALL
                    </ap-button>
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="activeFilter != 'pending'"
                        @click="onSet('pending')">
                        PENDING
                    </ap-button>
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="activeFilter != 'sent'"
                        @click="onSet('sent')">
                        SENT
                    </ap-button>
                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :rounded="true"
                        :outline="activeFilter != 'failed'"
                        @click="onSet('failed')">
                        FAILED
                    </ap-button>
                </div>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default
{
    name: 'Header',

    computed:
    {
        ...mapGetters({
            items: 'myCompanySmsTransactionRecipient/items',
            isLoading: 'myCompanySmsTransactionRecipient/isLoading',
            page: 'myCompanySmsTransactionRecipient/page',
            activeFilter: 'myCompanySmsTransactionRecipient/activeFilter'
        }),
    },

    methods:
    {
        ...mapActions({
            onSetFilter: 'myCompanySmsTransactionRecipient/onSetFilter'
        }),

        async onSet(filter)
        {
            if (filter == 'pending')
            {
                this.$parent.onLoad(1);

                this.onSetFilter('pending');
            }
            else if (filter == 'sent')
            {
                this.$parent.onLoad(2);

                this.onSetFilter('sent');
            }
            else if (filter == 'failed')
            {
                this.$parent.onLoad(3);

                this.onSetFilter('failed');
            }
            else
            {
                this.$parent.onLoad(false);

                this.onSetFilter('all');
            }
        },

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
