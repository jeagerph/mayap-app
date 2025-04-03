<template>
    <div class="ap-animate ap-animate-fade-in">
        <div class="card radius-10 bg-primary bg-gradient">
            <div class="card-body">
                <ap-grid>
                    <div class="ap-width-expand">
                        <small class="ap-text-inverse ap-text-bold">
                            ACTIVE BARANGAYS
                        </small>
                        <h2 class="ap-margin-remove ap-text-inverse"
                            v-if="!summaryLoading">
                            {{summary.active}}
                        </h2>
                        <div class="ap-margin-small-top"
                            v-else>
                            <ap-loader
                                :size="'small'"
                                :color="'primary'" />
                        </div>
                        
                    </div>
                    <div class="ap-text-right">
                        <div class="widgets-icons bg-white text-primary ms-auto">
                            <i class="bx bxs-data"></i>
                        </div>
                    </div>
                </ap-grid>

                <hr class="">

                <ap-grid>
                    <div class="ap-width-expand">
                        <small class="ap-text-inverse">
                            TOTAL
                        </small>
                    </div>
                    <div class="ap-text-right">
                        <h5 class="ap-text-inverse"
                            v-if="!summaryLoading">
                            {{summary.total}}
                        </h5>
                        <ap-loader
                            v-else
                            :size="'small'"
                            :color="'primary'" />
                        
                    </div>
                </ap-grid>
            </div>
        </div>
    </div>
</template>

<script>
import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    data()
    {
        return {
            summaryLoading: false,
            summary:
            {
                total: 0,
                active: 0,
            }
        };
    },

    created()
    {
        this.loadSummary();
    },

    methods:
    {
        async loadSummary()
        {
            this.summaryLoading = true;

            const response = await Http.get(`/administration/dashboard/summary/barangays`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },
    },
};
</script>