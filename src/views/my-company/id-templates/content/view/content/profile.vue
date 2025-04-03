<template>
    <div class="card card-body ap-padding">
        <div class="ap-text-center">
            <div class="ap-avatar ap-avatar-xlarge">
                <div class="ap-avatar-content">
                    <div>
                        <span class="ap-avatar-label">
                            <i class="bx bx-id-card"></i>
                        </span>
                    </div>
                </div>
            </div>

            <h5 class="ap-margin-small-top"
                v-if="!isLoading('show')">
                {{idTemplate.name}}
            </h5>
            <ap-placeholder
                :size="'medium'"
                v-else />

            <p class="ap-text-italic ap-margin-remove"
                v-if="!isLoading('show')">
                {{idTemplate.description?idTemplate.description:'No description'}}
            </p>
            <ap-placeholder
                :size="'small'"
                v-else />

            <hr>

            <div class="ap-margin-small-top"
                v-if="!isLoading('show')">
                <router-link
                    class="ap-button ap-button-outline-warning ap-button-small ap-button-full-rounded ap-margin-xsmall-right"
                    :to="`/company/id-templates/${idTemplate.id}/edit`">
                    EDIT
                </router-link>
                <ap-button
                    class=""
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="openModal('delete')">
                    DELETE
                </ap-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            idTemplate: 'myCompanyIdTemplate/selected',
            isLoading: 'myCompanyIdTemplate/isLoading',
        }),
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
}
</script>
