<template>
    <div class="card card-body ap-animate ap-animate-fade-in">

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <h4 class="ap-text-bold">
                    TOP NETWORKS
                </h4>
            </div>
            <div class="ap-text-right@m">
                
                <div class="ap-inline">
                    <ap-button
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        @click="toggleModal('selectBarangay', true)">
                        {{ currentBarangay }}
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
                
            </div>
        </ap-grid>

        <div
            v-if="!beneficiariesLoading"
            class="ap-card-scroll-custom">

            <ul class="ap-list ap-list-divider"
                v-if="beneficiaries.length">
                <item-component 
                    v-for="(item, index) in beneficiaries"
                    :key="index"
                    :item="item"/>
            </ul>
            <ap-card-empty
                v-else
                :label="'no record yet'"/>
        </div>

        <div class="ap-margin-medium-top ap-text-center"
            v-else>

            <ap-loader
                :size="'large'" />

            <p>
                LOADING...
            </p>
        </div>

        <select-barangay-modal />

    </div>
</template>

<script>
import Http from '@/services';

import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

import SelectBarangayModal from './components/modals/select-barangay';

export default
{
    name: 'DashboardTopNetworks',

    components:
    {
        ItemComponent,
        PlaceholderComponent,

        SelectBarangayModal,
    },

    data()
    {
        return {
            selectBarangayModal: false,

            beneficiaries: [],
            beneficiariesLoading: false,
            
            downloadLoading: false,

            form:
            {
                barangay: '',
            },

            barangay: {},
        };
    },

    created()
    {
        this.onLoad();
    },

    computed:
    {
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
        async onLoad()
        {
            let url = `/my-company/summary/beneficiaries/networks/top?ctx`;

            if (this.form.barangay)
            {
                url += `&filter[barangay]=${this.form.barangay}`;   
            }

            this.beneficiariesLoading = true;

            const response = await Http.get(url);

            this.beneficiariesLoading = false;

            if (response.status == 200)
            {
                this.beneficiaries = response.data;
            }
        },
        async download()
        {
            this.errors = {};

            this.downloadLoading = true;
            
            const response = await Http.get(
                `/my-company/summary/officers-networks/report/download`
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
        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        }
    },
};
</script>

<style scoped>

.ap-card-scroll-custom {
    height: 400px;
    overflow: hidden;
}

.ap-card-scroll-custom:hover {
    overflow-y: auto;
}
</style>