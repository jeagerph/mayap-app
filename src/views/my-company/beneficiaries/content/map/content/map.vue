<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">

        <gmap-map
            v-if="!beneficiariesLoading"
            style="width: 100%; height: 800px;"
            :zoom="10"
            :center="center">
            <gmap-marker
                v-for="(location, index) in beneficiaries"
                :key="index"
                :position="{
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude)
                }"
                @click="toggleInfoCard(index)"
            />

            <gmap-info-window
                :options="{
                    maxWidth: 500,
                    pixelOffset: { width: 0, height: -35 }
                }"
                :position="infoCard.position"
                :opened="infoCard.open"
                @closeclick="infoCard.open=false">
                <div v-html="infoCard.template"></div>
            </gmap-info-window>
        </gmap-map>

        <div class="ap-text-center ap-margin-medium-top"
            v-if="beneficiariesLoading">
            <ap-loader
                :size="'large'" />

            <p>
                Loading ...
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    data()
    {
        return {
            center:
            { 
                lat: 14.8386,
                lng: 120.2842
            },

            infoCard:
            {
                position: {
                    lat: 0,
                    lng: 0
                },
                open: false,
                template: ''
            },

            beneficiaries: [],
            beneficiariesLoading: false,
        };
    },

    created()
    {
        this.initialize();

        this.loadBeneficiaries();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser'
        }),
    },

    methods:
    {
        toggleInfoCard(index)
        {
            if (this.infoCard.open) return this.infoCard.open = false;

            let beneficiary = this.beneficiaries[index];

            this.infoCard.position = {
                lat: parseFloat(beneficiary.latitude), 
                lng: parseFloat(beneficiary.longitude)
            }
            this.infoCard.template = `<div>
                <p class="ap-text-bold ap-margin-remove">${beneficiary.full_name}</p>
                <p class="ap-text-bold ap-margin-remove">${this.getAge(beneficiary.date_of_birth)} YRS OLD &middot; ${beneficiary.gender_name}</p>
                <div class="ap-margin-xsmall-top">
                    <a href="/company/beneficiaries/${beneficiary.slug_code}" target="new">
                        <small>[ SEE PROFILE ]</small>
                    </a>
                </div>
            </div>`;
            this.infoCard.open = true
        },

        async loadBeneficiaries()
        {
            this.beneficiariesLoading = true;

            const response = await Http.get(`/my-company/beneficiaries/locations/list`);

            this.beneficiariesLoading = false;

            if (response.status == 200)
            {
                this.beneficiaries = response.data;
            }
        },

        getAge(date)
        {
            return Dater.age(date);
        },

        initialize()
        {
            this.center = {
                lat: parseFloat(this.accessUser.company.map_setting.latitude),
                lng: parseFloat(this.accessUser.company.map_setting.longitude),
            }
        }
    }
}
</script>