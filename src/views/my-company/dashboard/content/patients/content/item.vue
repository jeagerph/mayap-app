<template>
    <li>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <h5 class="ap-text-bold">
                    {{ item.full_name }}
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    FINDINGS
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    <span v-if="item.findings">
                        {{ findings }}
                    </span>
                    <span class="vh-text-italic"
                        v-else>
                        not indicated
                    </span>
                </p>
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
                <div class="ap-inline ap-margin-xsmall-righ">
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

                <div class="ap-inline">
                    <ap-button
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        :size="'small'"
                        :rounded="true">
                        <i class="bx bx-dots-horizontal-rounded"></i>
                    </ap-button>
                    <ul class="dropdown-menu" style="padding-left: 0px;">
                        <li>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('view')">VIEW</a>
                            <a class="dropdown-item ap-link-reset ap-point" @click="openModal('update')">EDIT</a>
                        </li>
                    </ul>
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

                if (nameLength > 22) name = `${name.substring(0, 21)}...`;
            }

            return name;
        },

        findings()
        {
            let name = this.item.findings;

            if (name)
            {
                let nameLength = name.length;

                if (nameLength > 40) name = `${name.substring(0, 39)}...`;
            }

            return name;
        },

        assessmentAndRecommendation()
        {
            let name = this.item.assessment_recommendation;

            if (name)
            {
                let nameLength = name.length;

                if (nameLength > 40) name = `${name.substring(0, 39)}...`;
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
            select: 'companyDashboardPatient/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
