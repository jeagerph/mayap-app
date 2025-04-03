<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h4 class="ap-text-bold ap-text-center">
                    NETWORKS
                </h4>
                <ap-bar-chart
                    v-if="!summaryLoading"
                    :title="title"
                    :xLegends="networksData.xLegends"
                    :yLegends="networksData.yLegends"
                    :backgroundColor="barColor"
                    :singleColorOnly="false" />

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
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    name: 'NetworksPerMonth',

    data()
    {
        return {
            summaryLoading: false,

            networksData:
            {
                xLegends: [
                    'JAN',
                    'FEB',
                    'MAR',
                    'APR',
                    'MAY',
                    'JUN',
                    'JUL',
                    'AUG',
                    'SEP',
                    'OCT',
                    'NOV',
                    'DEC',
                ],
                yLegends: [],

                backgroundColor:
                [
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
                    '#228CDB',
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

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        company()
        {
            return this.accessUser.company;
        },

        barColor()
        {
            if (this.company.province_id == '0314')
            {
                return [
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                    '#FF69B4',
                ];
            }

            return [
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
                '#228CDB',
            ];
        },
    },

    methods:
    {
        async load()
        {
            let from = `${this.currentYear}-01-01`;
            let to = `${this.currentYear}-12-31`;

            let url = `/my-company/summary/networks/monthly?from=${from}&to=${to}`;

            this.summaryLoading = true;

            const response = await Http.get(url);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.networksData.yLegends = [];
                
                this.networksData.xLegends.forEach((month, index) => {
                    let count = index + 1;

                    let legend = response.data.data.find(row => row.networkMonth == count);

                    if (legend) this.networksData.yLegends.push(legend.count);
                    else this.networksData.yLegends.push(0);
                });

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