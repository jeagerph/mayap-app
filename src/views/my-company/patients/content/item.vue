<template>
    <li class="ap-point">

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    PATIENT
                </small>
                <h5 class="ap-text-bold">
                    {{ item.full_name }}
                </h5>

                <div class="ap-margin-top">
                    <ap-button
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :color="statusClass"
                        :size="'small'"
                        :rounded="true">
                        {{ item.status.name }}
                    </ap-button>
                    <ul class="dropdown-menu" style="padding-left: 0px;">
                        <li>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('approve')" v-show="[2,4].includes(this.item.status.id)">REVERT TO APPROVAL</a>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('inProgress')" v-show="[1,3,4].includes(this.item.status.id)">IN PROGRESS</a>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('complete')" v-show="[1,2].includes(this.item.status.id)">COMPLETE</a>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('cancel')" v-show="[1,2,3].includes(this.item.status.id)">CANCEL</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    BENEFICIARY OF
                </small>

                <h5 class="ap-text-bold">
                    {{ item.beneficiary.full_name }}
                    
                </h5>

                <div class="ap-margin-top">
                    <router-link
                    class="ap-button ap-button-outline-primary ap-button-small ap-button-full-rounded"
                    :to="`/company/beneficiaries/${item.beneficiary.slug.code}`">
                        SEE PROFILE
                    </router-link>

                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('create')">
                        <i class="lni lni-plus"></i> NEW PATIENT
                    </ap-button>
                </div>
                
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    ASSESSMENT & RECOMMENDATION
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    <span v-if="item.assessment_recommendation">
                        {{ assessmentAndRecommendation }}
                    </span>
                    <span class="vh-text-italic"
                        v-else>
                        not indicated
                    </span>
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l ap-text-right@m">

                <div class="ap-margin-top">

                    <ap-button
                        :color="'primary'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('view')">
                        VIEW DETAILS
                    </ap-button>

                    <span class="ap-margin-xsmall-left ap-margin-xsmall-right">
                        |
                    </span>

                    <ap-button
                        :color="'warning'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('update')">
                        EDIT
                    </ap-button>

                    <ap-button
                        :color="'danger'"
                        :size="'small'"
                        :outline="true"
                        :rounded="true"
                        @click="openModal('delete')">
                        DELETE
                    </ap-button>
                </div>
            </div>
        </ap-grid>

        <ap-grid :gutter="'small'"
            class="ap-margin-top">
            <div class="ap-width-expand@m">
                <small class="ap-text-italic">
                    <span class="ap-text-bold"> 
                        Other Remarks:
                    </span> {{ item.remarks }}
                </small>
            </div>
            <div class="ap-text-right@m">
                <small class="ap-text-italic">
                    Created by {{ item.created_by.full_name }}
                    &middot;
                    <ap-moment :datetime="item.created_at" />
                </small>
            </div>
        </ap-grid>

        
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import { Dater } from '@/utils';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        patientDate()
        {
            return Dater.format(this.item.patient_date); 
        },

        problemPresented()
        {
            let name = this.item.problem_presented;

            if (name)
            {
                let nameLength = name.length;

                if (nameLength > 50) name = `${name.substring(0, 49)}...`;
            }

            return name;
        },

        findings()
        {
            let name = this.item.findings;

            if (name)
            {
                let nameLength = name.length;

                if (nameLength > 80) name = `${name.substring(0, 79)}...`;
            }

            return name;
        },

        assessmentAndRecommendation()
        {
            let name = this.item.assessment_recommendation;

            if (name)
            {
                let nameLength = name.length;

                if (nameLength > 80) name = `${name.substring(0, 79)}...`;
            }
    
            return name;
        },
        
        statusClass()
        {
            if (this.item.status.id == 1) return 'default';
            else if (this.item.status.id == 2) return 'primary';
            else if (this.item.status.id == 3) return 'success';
            else if (this.item.status.id == 4) return 'warning';
        }
    },

    methods:
    {
        ...mapActions({
            select: 'companyPatient/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
