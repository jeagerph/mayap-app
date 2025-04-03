<template>
    <li>
        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <router-link
                    class="ap-link-reset"
                    :to="`/administration/barangays/${slugCode}`">
                    <h6 class="ap-text-bold ap-margin-remove">
                        BRGY {{item.barangay.name}}
                    </h6>
                </router-link>
            </div>
            <div class="ap-text-right@m">
                <p class="ap-text-bold">
                    {{fileSize(item.total_consumption)}} / {{fileSize(item.server_capacity)}}
                </p>
            </div>
        </ap-grid>

        <div class="ap-margin-small-top">
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

        <div class="ap-margin-small-top"
            v-if="showDetails">
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
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0 ap-margin-remove">
                            {{fileSize(item.photo_consumption)}}
                        </h6>
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
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0 ap-margin-remove">
                            {{fileSize(item.document_consumption)}}
                        </h6>
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
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0 ap-margin-remove">
                            {{fileSize(item.record_consumption)}}
                        </h6>
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
                            </div>
                        </ap-grid>
                    </div>
                    <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l ap-text-right">
                        <h6 class="mb-0 ap-margin-remove">
                            {{fileSize(item.external_document_consumption)}}
                        </h6>
                    </div>
                </ap-grid>
            </div>
        </div>

        <div class="ap-margin-top ap-text-center">
            <a class="ap-point"
                @click="showDetails = !showDetails">
                <small>
                    <i class="lni ap-margin-xsmall-right" :class="showDetails ? 'lni-chevron-up':'lni-chevron-down'"></i>
                    {{showDetails ? 'HIDE':'SHOW'}} DETAILS
                </small>
            </a>
        </div>
    </li>
</template>

<script>
import { Text } from '@/utils';

export default
{
    props:
    {
        item: Object
    },

    data()
    {
        return {
            showDetails: false,
        };
    },

    computed:
    {
        slugCode()
        {
            return this.item.slug
                ? this.item.slug.code
                : 'DELETED'
        },

        serverCapacity()
        {
            return parseInt(this.item.server_capacity);
        },

        totalUsedCapacity()
        {
            return parseInt(this.item.total_consumption);
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
        fileSize(value)
        {
            return Text.readableFileSizeRoundOff(value);
        },

        fileCount(value)
        {
            return Text.commaSeparated(value);
        },
    },
};
</script>

