<template>
    <li class="ap-point">
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand">
                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <ap-avatar
                            :color="'primary'"
                            :shape="'circle'"
                            :label="'AA'"
                            :src="beneficiary.photo"
                            />
                    </div>
                    <div class="ap-width-expand ap-margin-small-left">
                        <h5 class="ap-text-bold">
                            {{beneficiary.full_name}}
                        </h5>

                        <p class="ap-margin-remove ap-text-bold">
                            {{beneficiary.gender.name}}
                            &middot;
                            {{age}} yrs old
                        </p>
                    </div>
                </ap-grid>
            </div>

            <div class="ap-text-right@m">
                <a class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                    :href="`/company/beneficiaries/${this.beneficiary.slug.code}`"
                    target="blank">
                    SEE PROFILE
                </a>

                <a class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                    @click="toggle()">
                    SEE NETWORK ({{ beneficiary.networks_count }})
                </a>

                <ap-button
                    :size="'small'"
                    :color="'danger'"
                    :rounded="true"
                    @click="openModal('delete')">
                    <i class="bx bx-trash"></i>
                </ap-button>
            </div>
        </ap-grid>

        <div v-show="show"
            class="ap-animate ap-animate-fade-in">

            <div v-if="!networksLoading">

                <ul class="ap-list ap-list-divider"
                    v-if="networks.length">

                    <first-degree-item-component
                        v-for="(item, index) in networks"
                        :key="item.id"
                        :item="item" />
                </ul>

            </div>

            <ap-placeholder
                class="ap-margin-top"
                :size="'medium'"
                v-else />
        </div>

            <!-- <div class="ap-text-right@m">
            <a class="ap-button ap-button-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                :href="`/company/beneficiaries/${this.beneficiary.slug.code}`"
                target="blank">
                SEE PROFILE
            </a>
            <a class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                :href="`/company/beneficiaries/${this.beneficiary.slug.code}/network`"
                target="blank">
                SEE NETWORK ({{ beneficiary.networks_count }})
            </a>

            <ap-button
                :size="'small'"
                :color="'danger'"
                :rounded="true"
                @click="openModal('delete')">
                <i class="bx bx-trash"></i>
            </ap-button>
            </div> -->
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

import FirstDegreeItemComponent from './first-degree-item';

export default
{
    name: 'Item',

    components:
    {
        FirstDegreeItemComponent,
    },

    props:
    {
        item: Object
    },

    data()
    {
        return {
            show: false,

            networks: [],
            networksLoading: false
        }
    },

    computed:
    {
        beneficiary()
        {
            return this.item.beneficiary;
        },

        age()
        {
            return Dater.age(this.beneficiary.date_of_birth);
        },
    },


    methods:
    {
        ...mapActions({
            select: 'companyBeneficiaryNetwork/select',
        }),

        async loadNetworks()
        {
            this.networksLoading = true;
            
            const response = await Http.get(`/my-company/beneficiary/${this.beneficiary.slug.code}/networks`);

            this.networksLoading = false;

            if (response.status == 200)
            {
                this.networks = response.data;
            }
        },

        toggle()
        {
            this.show = !this.show;

            if (this.show)
            {
                if (this.networks.length > 0) return false;

                if (!this.beneficiary.networks_count) return false;

                this.loadNetworks();
            }
        },

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
}

</script>