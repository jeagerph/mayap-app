<template>
    <div class="card card-body ap-animate ap-animate-fade-in">

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <h4 class="ap-text-bold">
                    TYPE OF ASSISTANCES
                </h4>
            </div>
            <div class="ap-text-right@m">

                <div class="ap-inline">
                    <ap-button
                        class="dropdown-toggle ap-margin-xsmall-right"
                        data-bs-toggle="dropdown"
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        :fullWidth="true">
                        {{ currentYear }}
                    </ap-button>
                    <ul class="dropdown-menu" style="margin: 0px;">
                        <li v-for="(year, index) in listOfYears"
                            :key="index">
                            <a class="dropdown-item ap-point"
                                @click="selectYear(year)">
                                {{ year }}
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="ap-inline">
                    <ap-button
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        @click="toggleModal('selectBarangay', true)">
                        {{ currentBarangay }}
                    </ap-button>
                </div>

                <span class="ap-margin-xsmall-left ap-margin-xsmall-right">
                    |
                </span>

                <div class="ap-inline">
                    <ap-button
                        :size="'small'"
                        :color="'success'"
                        :outline="true"
                        :rounded="true"
                        @click="toggleModal('download', true)">
                        DOWNLOAD
                    </ap-button>
                </div>
                
            </div>
        </ap-grid>

        <div class="ap-margin-medium-top">
            <ap-line-chart
                v-if="!summaryLoading"
                :datasets="datasets"
                :legends="legends"
                    />

            <div class="ap-margin-medium-top ap-text-center"
                v-else>

                <ap-loader
                    :size="'large'" />

                <p>
                    LOADING...
                </p>
            </div>
        </div>
        


        <select-barangay-modal />

        <download-modal />
    </div>
    

</template>


<script>
import Http from '@/services';

import { Dater } from '@/utils';

import SelectBarangayModal from './components/modals/select-barangay';
import DownloadModal from './components/modals/download';

export default
{
    components:
    {
        SelectBarangayModal,
        DownloadModal,
    },

    data()
    {
        return {
            selectBarangayModal: false,
            downloadModal: false,

            form:
            {
                year: '',
                barangay: '',
            },

            listOfYears: [],

            barangay: {},

            summary:
            {
                beneficiaries: [],
                assistances: [],
                patients: [],
            },
            summaryLoading: false,

            legends: [
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
            datasets: [],

            guaranteeDatasets:
            {
                label: 'GUARANTEE LETTER',
                fill: false,
                borderColor: '#964B00',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            medicalDatasets:
            {
                label: 'MEDICAL/MEDICINE',
                fill: false,
                borderColor: '#0000FF',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            financialDatasets:
            {
                label: 'FINANCIAL',
                fill: false,
                borderColor: '#008000',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            burialDatasets:
            {
                label: 'BURIAL',
                fill: false,
                borderColor: '#808080',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            scholarDatasets:
            {
                label: 'BURIAL',
                fill: false,
                borderColor: '#FFC0CB',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            scholarDatasets:
            {
                label: 'SCHOLAR',
                fill: false,
                borderColor: '#FFC0CB',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            trainingDatasets:
            {
                label: 'TRAINING',
                fill: false,
                borderColor: '#FFA500',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            infrastructureDatasets:
            {
                label: 'INFRASTRUCTURE',
                fill: false,
                borderColor: '#FFFF00',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
        };
    },
    
    created()
    {
        this.initialize();

        this.load();
    },

    computed:
    {
        currentYear()
        {
            return this.form.year;
        },

        hasBarangay()
        {
            return Object.keys(this.barangay).length > 0;
        },

        currentBarangay()
        {
            return this.hasBarangay
                ? `BRGY ${this.barangay.name}`
                : 'ALL BRGY';
        }
    },

    methods:
    {
        async load()
        {
            this.datasets = [];
            this.guaranteeDatasets.data = [];
            this.medicalDatasets.data = [];
            this.financialDatasets.data = [];
            this.burialDatasets.data = [];
            this.scholarDatasets.data = [];
            this.trainingDatasets.data = [];
            this.infrastructureDatasets.data = [];

            let url = `/my-company/summary/assistances/type/progress/monthly?ctx`;
                url += `&from=${this.form.year}-01-01`;
                url += `&to=${this.form.year}-12-31`;

            if (this.form.barangay)
            {
                url += `&filter[barangay]=${this.form.barangay}`;   
            }

            this.summaryLoading = true

            const response = await Http.get(url);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;

                this.legends.forEach((month, index) => {

                    let count = index + 1;

                    let checking = this.summary.assistances.find(row => row.month == count);

                    if (checking)
                    {
                        this.guaranteeDatasets.data.push(checking.guarantee);

                        this.medicalDatasets.data.push(checking.medical);
                        
                        this.financialDatasets.data.push(checking.financial);

                        this.burialDatasets.data.push(checking.burial);

                        this.scholarDatasets.data.push(checking.scholar);

                        this.trainingDatasets.data.push(checking.training);

                        this.infrastructureDatasets.data.push(checking.infrastructure);
                    }
                    else
                    {
                        this.guaranteeDatasets.data.push(0);

                        this.medicalDatasets.data.push(0);
                        
                        this.financialDatasets.data.push(0);

                        this.burialDatasets.data.push(0);

                        this.scholarDatasets.data.push(0);

                        this.trainingDatasets.data.push(0);
                        
                        this.infrastructureDatasets.data.push(0);
                    }
                });

                this.datasets.push(this.guaranteeDatasets);
                this.datasets.push(this.medicalDatasets);
                this.datasets.push(this.financialDatasets);
                this.datasets.push(this.burialDatasets);
                this.datasets.push(this.scholarDatasets);
                this.datasets.push(this.trainingDatasets);
                this.datasets.push(this.infrastructureDatasets);
            }
        },

        selectYear(year)
        {
            this.form.year = year;

            this.load();
        },

        initialize()
        {
            let year = Dater.getYear();

            this.form.year = year;

            let startTemp = parseInt(year);
            let endTemp = parseInt(year) - 5;

            while (startTemp >= endTemp)
            {
                this.listOfYears.push(startTemp);

                startTemp--;
            }
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },
}
</script>