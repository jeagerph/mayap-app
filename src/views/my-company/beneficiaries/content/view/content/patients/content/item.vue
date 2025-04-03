<template>
    <li>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <h5>
                    {{ item.full_name }}
                </h5>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    DATE
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ patientDate }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    RELATION TO PATIENT
                </small>

                <p class="ap-text-bold ap-margin-remove">
                    {{ item.relation_to_patient }}
                </p>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l ap-text-right@m">

                <div>
                    <ap-button
                        class="dropdown-toggle ap-margin-small-left"
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
        </ap-grid>

        <div class="ap-margin-small-top ap-text-right">
            <ap-button
                class="ap-margin-xsmall-right"
                :size="'small'"
                :color="'primary'"
                :outline="true"
                @click="show = !show">
                VIEW INFO
            </ap-button>
            <ap-button
                class="ap-margin-xsmall-right"
                :size="'small'"
                :color="'warning'"
                :outline="true"
                @click="openModal('update')">
                EDIT
            </ap-button>
            <ap-button
                :size="'small'"
                :color="'danger'"
                :outline="true"
                @click="openModal('delete')">
                DELETE
            </ap-button>
        </div>

        <div class="ap-margin-top"
            v-show="show">

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold ap-text-italic">
                        Problem Presented
                    </small>

                    <div v-html="item.problem_presented"
                        v-if="item.problem_presented"
                        style="white-space: pre-wrap;"
                        class="ap-margin-small-top">
                    </div>
                    <p v-else class="ap-margin-remove ap-text-italic">
                        Not indicated
                    </p>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold ap-text-italic">
                        Findings
                    </small>

                    <div v-html="item.findings"
                        v-if="item.findings"
                        style="white-space: pre-wrap;"
                        class="ap-margin-small-top">
                    </div>
                    <p v-else class="ap-margin-remove ap-text-italic">
                        Not indicated
                    </p>
                </div>
            </ap-grid>

            <ap-grid :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold ap-text-italic">
                        Assessment & Recommendation
                    </small>

                    <div v-html="item.assessment_recommendation"
                        v-if="item.assessment_recommendation"
                        style="white-space: pre-wrap;"
                        class="ap-margin-small-top">
                    </div>
                    <p v-else class="ap-margin-remove ap-text-italic">
                        Not indicated
                    </p>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <small class="ap-text-bold ap-text-italic">
                        Needs Given
                    </small>

                    <div v-html="item.needs"
                        v-if="item.needs"
                        style="white-space: pre-wrap;"
                        class="ap-margin-small-top">
                    </div>
                    <p v-else class="ap-margin-remove ap-text-italic">
                        Not indicated
                    </p>
                </div>
            </ap-grid>
        </div>

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

    data()
    {
        return {
            show: false,
        };
    },

    computed:
    {
        patientDate()
        {
            return Dater.format(this.item.patient_date); 
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
            select: 'companyBeneficiaryPatient/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
