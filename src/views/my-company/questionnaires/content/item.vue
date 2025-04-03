<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">

                <h5 class="ap-margin-small">
                    <i class="bx bx-file ap-margin-xsmall-right"></i>
                    {{item.question}}
                </h5>
                <p class="ap-margin-remove">
                    <span v-if="item.description">
                        {{ item.description }}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        No description
                    </span>
                </p>
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
            <div class="ap-text-right@m">
                <ap-button
                    :data-tooltip="'Update'"
                    :color="'warning'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('update')">
                    <i class="lni lni-pencil"></i>
                </ap-button>
                <ap-button
                    :data-tooltip="'Delete'"
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    <i class="lni lni-trash"></i>
                </ap-button>
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
            select: 'myCompanyQuestionnaire/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
