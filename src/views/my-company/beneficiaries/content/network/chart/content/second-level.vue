<template>
    <li>
        <div class="level-2 network-rectangle">
            <div class="ap-text-center">
                <div :data-tooltip="beneficiary.full_name">
                    <ap-avatar
                        :color="'primary'"
                        :shape="'circle'"
                        :label="'AA'"
                        :size="'medium'"
                        :src="beneficiary.photo"
                        />
                </div>
                

                <p class="ap-text-bold ap-margin-remove"
                    :data-tooltip="beneficiary.full_name">
                    {{trimmedFullName}}
                </p>

                <small class="ap-margin-remove">
                    {{beneficiary.gender.name}}
                    &middot;
                    {{age}} yrs old
                </small>
            </div>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-small-top">
                
                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">

                        <a class="ap-link-reset ap-text-primary"
                            target="new"
                            :href="`/company/beneficiaries/${beneficiary.slug.code}`">
                            <small style="font-size: 11px;">
                                SEE PROFILE
                            </small>
                        </a>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <ap-button
                            :size="'small'"
                            :color="'danger'"
                            :outline="true"
                            :fullWidth="true"
                            :text="true"
                            @click="openModal('delete')">
                            REMOVE
                        </ap-button>
                    </div>
                </ap-grid>
            </div>
        </div>
        <ol class="list-wrapper level-3-wrapper"
            v-if="item.networks.length">

            <third-level-component
                v-for="(item, index) in filterNetworks"
                :key="index"
                :item="item"
            />

            <li v-show="showMoreIcon">
                <div class="level-3">
                    <a target="new"
                        :data-tooltip="`See Network`"
                        :href="`/company/beneficiaries/${beneficiary.slug.code}/network`">
                        <div class="ap-text-center">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="`+${item.networks.length - 4}`"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </a>
                </div>
            </li>
            
        </ol>
        <!-- <ol class="list-wrapper level-3-wrapper">

            <li>
                <div class="level-3">
                    <div class="ap-text-center">
                        <div :data-tooltip="'ACUNA, JEMUEL D.'">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="level-3">
                    <div class="ap-text-center">
                        <div :data-tooltip="'ACUNA, JEMUEL D.'">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="level-3">
                    <div class="ap-text-center">
                        <div :data-tooltip="'ACUNA, JEMUEL D.'">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="level-3">
                    <div class="ap-text-center">
                        <div :data-tooltip="'ACUNA, JEMUEL D.'">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="level-3">
                    <div class="ap-text-center">
                        <div :data-tooltip="'ACUNA, JEMUEL D.'">
                            <ap-avatar
                                :color="'primary'"
                                :shape="'circle'"
                                :label="'AA'"
                                :size="'medium'"
                                :src="''"
                                />
                        </div>
                    </div>
                </div>
            </li>
        </ol> -->
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import { Dater } from '@/utils';

import ThirdLevelComponent from './third-level';

export default
{
    components:
    {
        ThirdLevelComponent
    },

    props:
    {
        item: Object,
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

        trimmedFullName()
        {
            return this.beneficiary.full_name.length > 15
                ? `${this.beneficiary.full_name.substr(0,15)}...`
                : this.beneficiary.full_name
        },

        filterNetworks()
        {
            if (this.item.networks.length > 5)
                return this.item.networks.slice(1,5);

            return this.item.networks;
        },

        showMoreIcon()
        {
            return this.item.networks.length > 5;
        }
    },

    methods:
    {
        ...mapActions({
            select: 'companyBeneficiaryNetwork/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        }
    }
}
</script>