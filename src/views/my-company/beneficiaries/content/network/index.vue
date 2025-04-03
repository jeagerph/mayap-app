<template>
    <div>

        <div class="ap-animate ap-animate-fade-in">

            <div class="ap-text-right@m">
                <ap-button
                    :data-tooltip="'Chart View'"
                    :size="'small'"
                    :color="apButtonBackground"
                    :outline="view != 'chart'"
                    :rounded="true"
                    @click="view = 'chart'">
                    <i class="lni lni-network"></i>
                </ap-button>

                <ap-button
                    :data-tooltip="'List View'"
                    :size="'small'"
                    :color="apButtonBackground"
                    :outline="view != 'list'"
                    :rounded="true"
                    @click="view = 'list'">
                    <i class="lni lni-list"></i>
                </ap-button>
                <ap-button
                            v-if="!beneficiariesLoading"
                            type="button"
                            :color="'success'"
                            :loading="downloadLoading"
                            @click="download()">
                            Download
                        </ap-button>
            </div>
            
            <list-component v-if="view === 'list'" />
            
            <chart-component v-if="view === 'chart'" />

        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import ListComponent from './list';
import ChartComponent from './chart';

export default
{
    name: 'CompanyNetwork',

    data()
    {
      
        return {
            view: 'chart',
         
            beneficiariesLoading: false,
            
            downloadLoading: false,
        };
    },

    components:
    {
        ListComponent,
        ChartComponent,
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser'
        }),

        company()
        {
            return this.accessUser.company;
        },

        apButtonBackground()
        {
            if (this.company.province_id == '0314') return 'customPink';

            return 'primary';
        }
    },
    methods:{
        async download()
        {
            this.errors = {};

            this.downloadLoading = true;
            
            const response = await Http.get(
             `/my-company/beneficiary/${this.$route.params.code}/download/list`,
            );

            this.downloadLoading = false;

            if (response.status === 200)
            {
                window.open(response.data.path);
                this.closeModal();

                Toast.success({
                    message: 'Report has been downloaded.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Kindly double check your form.'
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
        },
    }
};
</script>
