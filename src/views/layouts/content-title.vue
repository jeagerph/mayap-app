<template>
    <div class="card shadow-none bg-transparent">
        <div class="card-body ap-padding-remove">
            <ap-grid
                :gutter="'small'"
                class="ap-flex-middle">
                <div class="ap-width-expand@m">
                    <h5 class="vh-text-bold text-uppercase">
                        {{title}}
                    </h5>

                    <small v-if="['view', 'create'].includes($route.meta.page)">
                        <router-link
                            class="ap-link-reset ap-text-primary"
                            :to="listCrumb.path">
                            <i class="lni lni-angle-double-left ap-margin-xsmall-left"></i> back to list
                        </router-link>
                        <span class="ap-margin-small-left ap-margin-small-right">
                            |
                        </span>
                        <a class="ap-link-reset ap-text-primary ap-point"
                            @click="$router.go(-1)">
                            <i class="lni lni-angle-double-left ap-margin-xsmall-left"></i> back to previous page
                        </a>

                    </small>
                    <small v-else-if="$route.meta.page === 'edit'">
                        <a class="ap-link-reset ap-text-primary ap-point"
                            @click="$router.go(-1)">
                            <i class="lni lni-angle-double-left ap-margin-xsmall-left"></i> back to view
                        </a>
                    </small>

                </div>
                <div class="ap-text-right">
                    <ap-clock />
                </div>
            </ap-grid>
            
        </div>
    </div>
</template>

<script>
export default
{
    computed:
    {
        title()
        {
            return this.$route.meta.name
                ? this.$route.meta.name
                :this.$route.name;
        },

        listCrumb()
        {
            return {
                path: this.$route.matched[0].path,
                name: this.$route.matched[0].name,
            };
        },

        viewCrumb()
        {
            return {
                path: this.$route.path,
                name: this.$route.name,
            };
        },
    },
};
</script>
