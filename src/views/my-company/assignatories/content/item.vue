<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">

                <h5 class="ap-margin-small">
                    {{item.name}}
                </h5>
                <p class="ap-text-bold ap-margin-remove">
                    {{ item.position }}
                </p>
                
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    SIGNATURE
                </small>

                <div v-if="item.signature_photo"
                    class="ap-margin-small-top">
                    <a class="ap-link-reset"
                        @click="openModal('updateSignature')">
                        <img :src="item.signature_photo" width="200">
                    </a>
                    
                </div>
                <div v-else
                    class="ap-margin-small-top">
                    <ap-button
                        :size="'small'"
                        :color="'warning'"
                        :outline="true"
                        :rounded="'full'"
                        @click="openModal('updateSignature')">
                        UPLOAD
                    </ap-button>
                </div>
                
                
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                <small class="ap-text-bold">
                    STATUS
                </small>
                
                <div class="ap-margin-small-top">
                    <a class="ap-link-reset ap-point"
                        @click="openModal('updateStatus')">
                        <div class="badge"
                            :class="statusClass">
                            {{statusName}}
                        </div>
                    </a>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l ap-text-right@m">
                <div>
                    <ap-button
                        v-show="item.signature_photo"
                        :size="'small'"
                        :color="'warning'"
                        :outline="true"
                        :rounded="'full'"
                        @click="openModal('updateSignature')">
                        EDIT SIGNATURE
                    </ap-button>
                </div>
                
                <div class="ap-margin-small-top">
                    <ap-button
                        :color="'warning'"
                        :size="'small'"
                        :outline="true"
                        :rounded="'full'"
                        @click="openModal('update')">
                        EDIT
                    </ap-button>
                    <ap-button
                        :data-tooltip="'Delete'"
                        :color="'danger'"
                        :size="'small'"
                        :outline="true"
                        :rounded="'full'"
                        @click="openModal('delete')">
                        <i class="lni lni-trash"></i>
                    </ap-button>
                </div>

                
            </div>
        </ap-grid>
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';

export default
{
    props:
    {
        item: Object,
    },

    computed:
    {
        statusName()
        {
            return this.item.enabled
                ? 'ACTIVE'
                : 'DISABLED';
        },

        statusClass()
        {
            return {
                'bg-success': this.item.enabled,
                'bg-warning': !this.item.enabled
            }
        },
    },

    methods:
    {
        ...mapActions({
            select: 'myCompanyAssignatory/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
