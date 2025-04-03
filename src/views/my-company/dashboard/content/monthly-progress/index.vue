<template>
    <div class="card card-body ap-animate ap-animate-fade-in ap-margin-medium-top">

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <h4 class="ap-text-bold">
                    {{ currentYear }}
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
    </div>
    

</template>


<script>
import Http from '@/services';

import { Dater } from '@/utils';

import SelectBarangayModal from './components/modals/select-barangay';

export default
{
    components:
    {
        SelectBarangayModal,
    },

    data()
    {
        return {
            selectBarangayModal: false,

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

            beneficiaryDatasets:
            {
                label: 'Beneficiaries',
                fill: false,
                borderColor: '#0d6efd',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            assistanceDatasets:
            {
                label: 'Assistances',
                fill: false,
                borderColor: '#17a00e',
                borderWidth: 3,
                lineTension: 0,
                data: [],
            },
            patientDatasets:
            {
                label: 'Patients',
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
            this.beneficiaryDatasets.data = [];
            this.assistanceDatasets.data = [];
            this.patientDatasets.data = [];

            let url = `/my-company/summary/progress/monthly?ctx`;
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

                    let benefChecking = this.summary.beneficiaries.find(row => row.month == count);

                    if (benefChecking)
                    {
                        this.beneficiaryDatasets.data.push(benefChecking.total);
                    }
                    else
                    {
                        this.beneficiaryDatasets.data.push(0);
                    }

                    let assistChecking = this.summary.assistances.find(row => row.month == count);

                    if (assistChecking)
                    {
                        this.assistanceDatasets.data.push(assistChecking.total);
                    }
                    else
                    {
                        this.assistanceDatasets.data.push(0);
                    }

                    let patientChecking = this.summary.patients.find(row => row.month == count);

                    if (patientChecking)
                    {
                        this.patientDatasets.data.push(patientChecking.total);
                    }
                    else
                    {
                        this.patientDatasets.data.push(0);
                    }
                });

                this.datasets.push(this.beneficiaryDatasets);
                this.datasets.push(this.assistanceDatasets);
                this.datasets.push(this.patientDatasets);
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


            this.beneficiaryDatasets.label = process.env.APP_BENEFICIARY_SINGULAR_NAME;
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },
}
</script>