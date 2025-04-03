<template>
    <div class="ap-animate ap-animate-fade-in ap-margin-top">
        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div>
                    <small class="ap-text-bold">
                        VOTER TYPE
                    </small>
                    
                    <ap-button
                        class="dropdown-toggle ap-margin-xsmall-top"
                        data-bs-toggle="dropdown"
                        :size="'small'"
                        :color="'primary'"
                        :outline="true"
                        :rounded="true"
                        :fullWidth="true">
                        {{ displayVoterType }}
                    </ap-button>
                    <ul class="dropdown-menu" style="margin: 0px;">
                        <li><a class="dropdown-item ap-point" @click="selectVoterType('')">ALL</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectVoterType(2)">COMMAND VOTES (CV)</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectVoterType(3)">SURE VOTES (SV)</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectVoterType(4)">SWING VOTES (SW)</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectVoterType(5)">BLOCK LISTED (BL)</a></li>
                        <li><a class="dropdown-item ap-point" @click="selectVoterType(1)">OTHERS (OTH)</a></li>
                    </ul>
                </div>
            </div>
        </ap-grid>

        <div class="ap-margin-top">
            <gmap-map
                v-if="!beneficiariesLoading"
                style="width: 100%; height: 800px;"
                :zoom="10"
                :center="center">
                <gmap-marker
                    v-for="(location, index) in filterBeneficiaries"
                    :key="index"
                    :position="{
                        lat: parseFloat(location.latitude),
                        lng: parseFloat(location.longitude)
                    }"
                    :icon="`/static/assets/images/map-marker/${location.voter_type_color}-marker.png`"
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

            voterType: '',
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

        company()
        {
            return this.accessUser.company;
        },

        filterBeneficiaries()
        {
            if (this.voterType)
            {
                return this.beneficiaries.filter(row => row.voter_type == this.voterType);
            }

            return this.beneficiaries;
        },

        displayVoterType()
        {
            if (this.voterType == 1)
            {
                return 'OTHERS (OTH)';
            }
            else if (this.voterType == 2)
            {
                return 'COMMAND VOTES (CV)';
            }
            else if (this.voterType == 3)
            {
                return 'SURE VOTES (SV)';
            }
            else if (this.voterType == 4)
            {
                return 'SWING VOTES (SW)';
            }
            else if (this.voterType == 5)
            {
                return 'BLOCK LISTED (BL)';
            }
            else
            {
                return 'ALL';
            }
        },
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
                <p class="ap-text-bold ap-margin-remove">${beneficiary.voter_type_name}</p>
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

            const response = await Http.get(`/my-company/beneficiaries/voter-type/list`);

            this.beneficiariesLoading = false;

            if (response.status == 200)
            {
                this.beneficiaries = response.data;
            }
        },

        selectVoterType(id)
        {
            this.voter_type = id;
        },

        getAge(date)
        {
            return Dater.age(date);
        },

        selectVoterType(id)
        {
            this.voterType = id;
        },

        initialize()
        {
            this.center = {
                lat: parseFloat(this.accessUser.company.map_setting.latitude),
                lng: parseFloat(this.accessUser.company.map_setting.longitude),
            }
            
            this.voter_type = '';
        }
    }
}
</script>

<style scoped>
    .badge-voter-type-OTH {
        background-color: #6c757d;
    }

    .badge-voter-type-CV {
        background-color: #17a00e;
    }

    .badge-voter-type-SV {
        background-color: #ff8f07;
    }

    .badge-voter-type-SW {
        background-color: #fffb22df;
    }

    .badge-voter-type-BL {
        background-color: #f41127;
    }
</style>