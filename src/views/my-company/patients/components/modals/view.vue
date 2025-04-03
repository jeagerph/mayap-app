<template>
    <ap-modal
        :isOpen.sync="$parent.$data.viewModal"
        :isCenter="true"
        :size="'container'">

        <ap-modal-body>
            <ap-modal-title>
                View Patient
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top">

                <div class="ap-text-center">
                    <h5 class="ap-text-bold ap-margin-remove">
                        {{ patient.full_name }}
                    </h5>
                    <div class="ap-margin-xsmall-top">
                        <div class="badge"
                            :class="statusClass">
                            {{ patient.status.name }}
                        </div>
                    </div>
                </div>

                <div class="ap-margin-medium-top">
                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                UNDER BENEFICIARY:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                {{ patient.beneficiary.full_name }} ({{ patient.relation_to_patient }})
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                DATE:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                {{ patientDate }}
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                PROBLEM PRESENTED:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                <span v-if="patient.problem_presented">
                                    {{ patient.problem_presented }}
                                </span>
                                <span class="ap-text-italic"
                                    v-else>
                                    Not indicated
                                </span>
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                FINDINGS:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                <span v-if="patient.findings">
                                    {{ patient.findings }}
                                </span>
                                <span class="ap-text-italic"
                                    v-else>
                                    Not indicated
                                </span>
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                ASSESSMENT & RECOMMENDATION:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                <span v-if="patient.assessment_recommendation">
                                    {{ patient.assessment_recommendation }}
                                </span>
                                <span class="ap-text-italic"
                                    v-else>
                                    Not indicated
                                </span>
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                NEEDS:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                <span v-if="patient.needs">
                                    {{ patient.needs }}
                                </span>
                                <span class="ap-text-italic"
                                    v-else>
                                    Not indicated
                                </span>
                            </p>
                        </div>
                    </ap-grid>

                    <ap-grid :gutter="'small'">
                        <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                            <small>
                                OTHER REMARKS:
                            </small>
                        </div>
                        <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                            <p class="ap-text-bold ap-margin-remove">
                                <span v-if="patient.remarks">
                                    {{ patient.remarks }}
                                </span>
                                <span class="ap-text-italic"
                                    v-else>
                                    Not indicated
                                </span>
                            </p>
                        </div>
                    </ap-grid>
                </div>

                

                    
                <div class="ap-margin-top ap-text-right">
                    <ap-button
                        type="button"
                        @click="closeModal()">
                        Done
                    </ap-button>
                </div>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { Form, Toast, Dater } from '@/utils';

export default
{
    data()
    {
        return {
            errors: {},
        };
    },

    computed:
    {
        ...mapGetters({
            patient: 'companyPatient/selected',
            isLoading: 'companyPatient/isLoading',
        }),

        statusClass()
        {
            if (this.patient.status.id == 1) return 'bg-secondary';
            else if (this.patient.status.id == 2) return 'bg-primary';
            else if (this.patient.status.id == 3) return 'bg-success';
            else if (this.patient.status.id == 4) return 'bg-warning';
        },

        patientDate()
        {
            return Dater.format(this.patient.patient_date);
        },

        viewModal()
        {
            return this.$parent.$data.viewModal;
        },
    },

    methods:
    {
        closeModal()
        {
            this.$parent.toggleModal('view', false);
        },
    },
};
</script>
