<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">
                <router-link
                    :to="`/company/document-templates/${item.id}`">
                    <h5 class="ap-margin-small">
                        <i class="bx bx-file ap-margin-xsmall-right"></i>
                        {{item.name}}
                    </h5>
                </router-link>
                <small class="ap-text-italic">
                    {{item.description?item.description:'No description'}}
                </small>
            </div>
            <div class="ap-text-right@m">

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
        </ap-grid>

        <ap-grid :gutter="'small'">
            <div class="ap-width-expand@m">
                <small class="ap-text-italic">
                    Created <ap-moment :datetime="item.created_at" />
                </small>
            </div>
            <div class="ap-text-right@m">
                <router-link
                    :data-tooltip="'Update'"
                    :to="`/company/document-templates/${item.id}/edit`"
                    class="ap-button ap-button-small ap-button-outline-warning ap-button-full-rounded">
                    EDIT
                </router-link>
                <ap-button
                    :data-tooltip="'Delete'"
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    DELETE
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
            select: 'myCompanyDocumentTemplate/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
