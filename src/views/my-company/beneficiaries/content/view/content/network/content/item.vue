<template>
    <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l ap-margin-xsmall-top">
        <div class="ap-card ap-card-body ap-card-default ap-padding-small ap-text-center">
            <ap-avatar
                :size="'large'"
                :color="'primary'"
                :shape="'circle'"
                :label="'AA'"
                :src="relative.photo"
                />

            <h5 class="ap-text-bold">
                {{fullName}}
            </h5>

            <div>
                <span class="badge bg-info ap-margin-xsmall-right"
                    style="font-size: 12px;">
                    {{item.relationship}}
                </span>
            </div>

            <div class="ap-margin-small-top">
                <p class="ap-margin-remove">
                    {{relative.gender.name}}
                    &middot;
                    {{age}} yrs old
                </p>
            </div>
            
            <hr>

            <div>
                <a class="ap-button ap-button-outline ap-button-outline-primary ap-button-small ap-button-full-rounded"
                    href="#">
                    <small class="ap-text-primary">
                        SEE PROFILE
                    </small>
                </a>
                <ap-button
                    :size="'small'"
                    :color="'danger'"
                    :outline="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>
            
        </div>
        
    </div>
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
        relative()
        {
            return this.item.relative;
        },

        fullName()
        {
            return `${this.relative.last_name}, ${this.relative.first_name} ${this.relative.middle_name ? this.relative.middle_name : ''}`;
        },

        age()
        {
            return Dater.age(this.relative.date_of_birth);
        },
    },

    methods:
    {
        ...mapActions({
            select: 'companyMemberRelative/select',
        }),

        openModal(name)
        {
            this.select(this.item);

            this.$parent.toggleModal(name, true);
        },
    },
};
</script>
