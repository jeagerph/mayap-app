<template>
    <ap-modal
        :isOpen.sync="$parent.$data.officersNetworksModal"
        :size="'container'"
        :isCenter="true">

        <ap-modal-body>
            <ap-modal-title>
                Officers/Leaders Network
            </ap-modal-title>

            <hr class="ap-margin-small-top">
            

            <div class="ap-margin-top">
                
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

                <ap-grid :gutter="'small'"
                    class="ap-margin-top">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <ap-button
                            v-if="!beneficiariesLoading"
                            type="button"
                            :color="'success'"
                            :loading="downloadLoading"
                            @click="download()">
                            Download
                        </ap-button>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m">
                        <ap-button
                            type="button"
                            @click="closeModal()">
                            Close
                        </ap-button>
                    </div>
                </ap-grid>

                <div class="ap-margin-top ap-text-center">
                    
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>

import Http from '@/services';

import ItemComponent from './content/item';
import PlaceholderComponent from './content/placeholder';

export default
{
    components:
    {
        ItemComponent,
        PlaceholderComponent,
    },

    data()
    {
        return {
            errors: {},

            beneficiaries: [],
            beneficiariesLoading: false,

            downloadLoading: false,
        };
    },

    created()
    {
        this.onLoad();
    },

    computed:
    {
        officersNetworksModal()
        {
            return this.$parent.$data.officersNetworksModal;
        },
    },

    methods:
    {
        async onLoad()
        {
            let url = `/my-company/summary/beneficiaries/networks/top?ctx`;

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

        closeModal()
        {
            this.$parent.toggleModal('officersNetworks', false);
        },
    },

    watch:
    {
        officersNetworksModal(val)
        {
            if (val) this.onLoad();
        },
    }
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