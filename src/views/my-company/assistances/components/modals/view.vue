<template>
    <ap-modal
        :isOpen.sync="$parent.$data.viewModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                View Assistances
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <div class="ap-text-center">
                    
                    <h5 class="ap-text-bold ap-text-underline ap-margin-remove">
                        {{ assistance.beneficiary.full_name }}
                    </h5>
                    <small class="ap-text-bold">
                        BENEFICIARY
                    </small>
                    
                </div>

                <div class="ap-margin-top">

                    <div v-if="!assistancesLoading"
                        class="ap-scroll-custom">

                        <ul class="ap-list ap-list-divider">

                            <li v-for="(item, index) in assistances"
                                :key="index">
                                <ap-grid :gutter="'small'">
                                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">

                                        <h5 class="ap-text-bold ap-margin-remove">
                                            {{ item.assistance_type }}
                                        </h5>

                                        <p class="ap-margin-small-top ap-margin-remove-bottom">
                                            AMOUNT: <span class="ap-text-bold">{{ getAssistanceAmount(item.assistance_amount) }}</span>
                                        </p>

                                        <p class="ap-margin-remove">
                                            ASSISTANCE FROM: <span class="ap-text-bold">{{ item.assistance_from }}</span>
                                        </p>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                        <small class="ap-text-bold">
                                            REQUESTED DATE
                                        </small>

                                        <p class="ap-text-bold ap-margin-remove">
                                            {{ getAssistanceDate(item.assistance_date) }}
                                        </p>
                                    </div>
                                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                                        <small class="ap-text-bold">
                                            DATE ASSISTED
                                        </small>

                                        <p class="ap-text-bold ap-margin-remove">
                                            <span v-if="item.is_assisted">
                                                {{ getAssistedDate(item.assisted_date) }}
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
                                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l ap-text-right@m">

                                        <div>
                                            <div class="badge"
                                                v-show="item.is_assisted"
                                                :class="{ 'bg-success': item.is_assisted }">
                                                ASSISTED
                                            </div>
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
                                </ap-grid>
                            </li>

                        </ul>
                    </div>

                    <div v-else>

                        <ap-placeholder
                            :size="'medium'"/>

                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'small'"/>
                    </div>
                </div>

                <div class="ap-margin-top ap-text-right">
                    <ap-button
                        type="button"
                        class="ap-margin-small-right"
                        @click="closeModal()">
                        Cancel
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Text, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            
            assistances: [],
            assistancesLoading: false,
        };
    },

    created()
    {
        this.load();
    },

    computed:
    {
        ...mapGetters({
            assistance: 'companyAssistance/selected',
            isLoading: 'companyAssistance/isLoading',
        }),

        viewModal()
        {
            return this.$parent.$data.viewModal;
        }
    },

    methods:
    {
        async load()
        {
            this.assistancesLoading = true;

            const response = await Http.get(`/my-company/assistance/${this.assistance.id}/assistances/other`);

            this.assistancesLoading = false;

            if (response.status == 200)
            {
                this.assistances = response.data;   
            }
        },

        getAssistanceDate(date)
        {
            return Dater.format(date); 
        },

        getAssistedDate(date)
        {
            return Dater.format(date);
        },

        getAssistanceAmount(amount)
        {
            return Text.currency(amount);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        closeModal()
        {
            this.$parent.toggleModal('view', false);
        },
    },

    watch:
    {
        viewModal(val)
        {
            if (val) this.load();
        }
    }
};
</script>

<style scoped>

.ap-scroll-custom {
    max-height: 400px;
    overflow: auto;
}
</style>
