<template>
    <li>
        <ap-grid
            :gutter="'small'">
            <div class="ap-width-expand@m">

                <ap-grid :gutter="'small'">
                    <div class="ap-width-fit-content">
                        <a class="ap-link-reset"
                            @click="openModal('updatePhoto')">
                            <ap-avatar
                                :shape="'circle'"
                                :src="item.photo"
                                :label="item.name[0]" />
                        </a>
                        
                    </div>
                    <div class="ap-width-expand">
                        <h5 class="ap-margin-remove">
                            {{item.prefix}} {{item.name}}
                        </h5>
                        <small>
                            {{item.position.name}}
                        </small>

                        <div class="ap-margin-xsmall-top">
                            <span class="badge bg-light" style="color: #6c757d;">
                                {{ item.registered_domain.name }}
                            </span>
                        </div>
                        
                    </div>
                </ap-grid>
            </div>
            <div class="ap-text-right@m">
                <ap-button
                    :data-tooltip="show ? 'Hide Details':'Show Details'"
                    :color="'primary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="toggleShow()">
                    {{show ? 'Hide':'Show'}}
                </ap-button>
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

        <div class="ap-margin-top ap-padding-small"
            style="background: #f6f6f6;"
            v-if="show">
            <ap-grid
                :gutter="'small'">
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <p class="ap-text-bold ap-text-italic">
                        Committees:
                    </p>
                    <div v-if="item.committees.length">
                        <div class="ap-margin-xsmall-left ap-margin-xsmall-right"
                            v-for="(committee, index) in item.committees"
                            :key="index">
                            <div class="ap-chips">
                                <p class="ap-margin-remove ap-flex-middle">
                                    <span>
                                        {{committee}}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="ap-margin-top" v-else>
                        <p class="ap-text-italic">No committee yet</p>
                    </div>
                </div>
                <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                    <p class="ap-text-bold ap-text-italic">
                        Signature:
                    </p>
                    <a class="ap-link-reset"
                        @click="openModal('updateSignature')">
                        <ap-avatar
                            :shape="'default'"
                            :src="item.signature"
                            :label="item.name[0]"
                            :size="'xlarge'" />
                    </a>
                </div>
            </ap-grid>
        </div>

        <div class="ap-margin-small-top"
            v-if="officialLoading">
            <ap-placeholder
                :size="'medium'" />
        </div>
        
    </li>
</template>

<script>
import { mapActions } from 'vuex';

import Http from '@/services';

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

            official: {},
            officialLoading: false,
        };
    },

    computed:
    {
        hasOfficial()
        {
            return Object.keys(this.official).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            select: 'adminBarangayOfficial/select',
        }),

        toggleShow()
        {
            this.show = !this.show;
        },

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
