<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h4 class="ap-text-bold ap-text-center">
                    REQUESTED / ASSISTED
                </h4>
                <ap-doughnut-chart
                    v-if="!summaryLoading"
                    :title="title"
                    :xLegends="assistanceData.xLegends"
                    :yLegends="assistanceData.yLegends"
                    :backgroundColor="assistanceData.backgroundColor" />

                <div class="ap-margin-medium-top ap-text-center"
                    v-else>
                    
                    <ap-loader
                        :size="'large'" />

                    <p>
                        LOADING...
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    name: 'AssistedOverAssistancesTotal',

    data()
    {
        return {
            summaryLoading: false,

            assistanceData:
            {
                xLegends: [
                    'ASSISTED',
                    'REQUESTED',
                ],
                yLegends: [],

                backgroundColor:
                [
                    '#26CC6E',
                    '#228CDB',
                ],
            },

            currentYear: '',
            title: '',
        };
    },

    created()
    {
        this.initialize();

        this.load();
    },

    methods:
    {
        async load()
        {
            let from = `${this.currentYear}-01-01`;
            let to = `${this.currentYear}-12-31`;

            let url = `/my-company/summary/assisted-over-assistances/total?from=${from}&to=${to}`;

            this.summaryLoading = true;

            const response = await Http.get(url);

            this.summaryLoading = false;

            if (response.status == 200)
            {   
                this.assistanceData.yLegends = [
                    response.data.total,
                    response.data.assisted,
                ];

                this.title = `${this.currentYear}`;
            }
        },

        initialize()
        {
            this.currentYear = Dater.getYear();
        }
    }
}
</script>