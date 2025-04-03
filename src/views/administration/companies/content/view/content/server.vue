<template>
<div class="card">
        <div class="card-body">
            
            <ap-grid :gutter="'small'"
                class="ap-margin-small-top">
                <div class="ap-width-expand">
                    <h5 class="ap-margin-remove ap-text-primary">
                        SERVER CAPACITY
                    </h5>
                </div>
                <div class="ap-text-right">
                    <h4 class="ap-margin-remove ap-text-primary"
                        v-if="!summaryLoading">
                        {{ fileSize(serverCapacity)}}
                    </h4>
                    <ap-loader
                        v-else
                        :size="'small'"
                        />
                </div>
            </ap-grid>

            <div v-if="!summaryLoading"
                :data-tooltip="`${percentageOfUsedCapacity} %`">
                <div class="progress">
                    <div
                        :class="progressBarColor"
                        :style="{ 'width': `${percentageOfUsedCapacity}% !important`}"
                        class="progress-bar"
                        role="progressbar"
                        :aria-valuenow="percentageOfUsedCapacity"
                        :aria-valuemin="0"
                        :aria-valuemax="100">
                        {{percentageOfUsedCapacity}} %
                    </div>
                </div>
            </div>
            <ap-placeholder
                v-else
                class="ap-margin-small-top"
                :size="'small'" />

            <div class="ap-margin-top">
                <ap-grid :gutter="'small'"
                    class="ap-flex-middle">
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-fit-content">
                                <div class="fm-file-box bg-light-primary text-primary"><i class="bx bx-image"></i></div>
                            </div>
                            <div class="ap-width-expand">
                                <h6 class="mb-0">Photos</h6>
                                <p class="mb-0 text-secondary">
                                    {{fileCount(summary.photos.files)}} file(s)
                                </p>
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0"
                            v-if="!summaryLoading">
                            {{fileSize(summary.photos.size)}}
                        </h6>
                        <ap-loader
                            v-else
                            :size="'small'"
                            />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-flex-middle">
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-fit-content">
                                <div class="fm-file-box bg-light-success text-success"><i class="bx bxs-file-doc"></i></div>
                            </div>
                            <div class="ap-width-expand">
                                <h6 class="mb-0">Documents</h6>
                                <p class="mb-0 text-secondary">
                                    {{fileCount(summary.documents.files)}} file(s)
                                </p>
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0"
                            v-if="!summaryLoading">
                            {{fileSize(summary.documents.size)}}
                        </h6>
                        <ap-loader
                            v-else
                            :size="'small'"
                            />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-flex-middle">
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-fit-content">
                                <div class="fm-file-box bg-light-warning text-warning"><i class="bx bx-server"></i></div>
                            </div>
                            <div class="ap-width-expand">
                                <h6 class="mb-0">Database</h6>
                                <p class="mb-0 text-secondary">
                                    {{fileCount(summary.records.files)}} record(s)
                                </p>
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0"
                            v-if="!summaryLoading">
                            {{fileSize(summary.records.size)}}
                        </h6>
                        <ap-loader
                            v-else
                            :size="'small'"
                            />
                    </div>
                </ap-grid>

                <ap-grid :gutter="'small'"
                    class="ap-flex-middle">
                    <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                        <ap-grid :gutter="'small'">
                            <div class="ap-width-fit-content">
                                <div class="fm-file-box bg-light-info text-info"><i class="bx bx-export"></i></div>
                            </div>
                            <div class="ap-width-expand">
                                <h6 class="mb-0">External Docs</h6>
                                <p class="mb-0 text-secondary">
                                    {{fileCount(summary.externalDocs.files)}} file(s)
                                </p>
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0"
                            v-if="!summaryLoading">
                            {{fileSize(summary.externalDocs.size)}}
                        </h6>
                        <ap-loader
                            v-else
                            :size="'small'"
                            />
                    </div>
                </ap-grid>
            </div>

            <hr>

            <div class="ap-margin-top ap-text-center"
                v-if="!summaryLoading">
                <ap-button
                    class=""
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('updateCapacity')">
                    UPDATE CAPACITY
                </ap-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Http from '@/services';

import { Text } from '@/utils';

export default
{
    data()
    {
        return {
            summaryLoading: false,
            summary:
            {
                server_capacity: 0,
                photos:
                {
                    files: 0,
                    size: 0
                },
                records:
                {
                    files: 0,
                    size: 0
                },
                documents:
                {
                    files: 0,
                    size: 0
                },
                externalDocs:
                {
                    files: 0,
                    size: 0
                },
            },
        };
    },

    created()
    {
        this.loadSummary();
    },

    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            isLoading: 'adminBarangay/isLoading'
        }),

        serverCapacity()
        {
            return parseInt(this.summary.server_capacity);
        },

        totalUsedCapacity()
        {
            return parseInt(this.summary.photos.size) + parseInt(this.summary.records.size) + parseInt(this.summary.documents.size) + parseInt(this.summary.externalDocs.size);
        },

        percentageOfUsedCapacity()
        {
            const capacity = parseInt(this.serverCapacity);

            const used = parseInt(this.totalUsedCapacity);

            if (capacity > used)
            {
                let percentage = used / capacity;
                    percentage = percentage * 100;

                if (percentage < 1)
                {
                    return percentage;
                }
                else
                {
                    return Math.round(percentage);
                }
            }
            
            return 100;
        },

        progressBarColor()
        {
            if (this.percentageOfUsedCapacity <= 100 && this.percentageOfUsedCapacity >= 91)
            {
                return 'bg-danger';
            }
            else if (this.percentageOfUsedCapacity <= 90 && this.percentageOfUsedCapacity >= 71)
            {
                return 'bg-warning';
            }
            else if (this.percentageOfUsedCapacity <= 70)
            {
                return 'bg-primary';
            }
            else
            {
                return 'bg-danger';
            }
        },
    },

    methods:
    {
        async loadSummary()
        {
            this.summaryLoading = true;

            const response = await Http.get(`/administration/barangay/${this.$route.params.code}/summary/server`);

            this.summaryLoading = false;

            if (response.status == 200)
            {
                this.summary = response.data;
            }
        },

        fileSize(value)
        {
            return Text.readableFileSizeRoundOff(value);
        },

        fileCount(value)
        {
            return Text.commaSeparated(value);
        },

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>