<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    RESIDENTS
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.residents.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bxs-user-circle"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.residents.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    ESTABLISHMENTS
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.establishments.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bx-store-alt"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.establishments.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    LOTS/BUILDINGS
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.buildings.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bx-buildings"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.buildings.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    HOUSEHOLD
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.household.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bx-building-house"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.household.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    DOCUMENTS
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.documents.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bx-file"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.documents.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
                <div class="card radius-10 bg-primary bg-gradient">
                    <div class="card-body">
                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    LUPON CASES
                                </small>
                                <h4 class="ap-margin-remove ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.cases.total}}
                                </h4>
                                <div class="ap-margin-small-top"
                                    v-else>
                                    <ap-loader
                                        :size="'small'"
                                        :color="'primary'" />
                                </div>
                                
                            </div>
                            <div class="ap-text-right">
                                <div class="ap-text-inverse ms-auto font-35">
                                    <i class="bx bx-folder"></i>
                                </div>
                            </div>
                        </ap-grid>

                        <hr class="ap-text-inverse">

                        <ap-grid>
                            <div class="ap-width-expand">
                                <small class="ap-text-inverse">
                                    THIS MONTH
                                </small>
                            </div>
                            <div class="ap-text-right">
                                <h5 class="ap-text-inverse"
                                    v-if="!summaryLoading">
                                    {{summary.cases.month}}
                                </h5>
                                <ap-loader
                                    v-else
                                    :size="'small'"
                                    :color="'primary'" />
                                
                            </div>
                        </ap-grid>
                    </div>
                </div>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import Http from '@/services';

import { Dater } from '@/utils';

export default
{
    data()
    {
        return {
            summaryLoading: false,
            summary:
            {
                residents:
                {
                    total: 0,
                    month: 0,
                },
                establishments:
                {
                    total: 0,
                    month: 0,
                },
                buildings:
                {
                    total: 0,
                    month: 0,
                },
                household:
                {
                    total: 0,
                    month: 0,
                },
                documents:
                {
                    total: 0,
                    month: 0,
                },
                cases:
                {
                    total: 0,
                    month: 0,
                },
            }
        };
    },

    created()
    {
        this.loadSummary();
    },

    methods:
    {
        async loadSummary()
        {
            const date = Dater.firstAndLastDateOfMonth();

            this.summaryLoading = true;

            const response = await Http.get(`/administration/barangay/${this.$route.params.code}/summary/constituents?from=${date.firstDate}&to=${date.lastDate}`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },
    },
};
</script>
