<template>
    <div class="card card-body ap-card-content">
        <div class="ap-text-center">
            <img src="/static/assets/images/logo/web-logo.png" width="500" height="500">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    name: 'Dashboard',
    
    mounted()
    {
        this.initialize();
    },

    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser'
        }),
    },

    methods:
    {
        initialize()
        {
            if (this.accessUser.account_type.id == 2)
            {
                if (this.accessUser.company.status == 0)
                {
                    return this.$router.push('/suspended');
                }
                
                this.$router.push('/company/dashboard');
            }
            else if (this.accessUser.account_type.id == 1)
            {
                this.$router.push('/administration/dashboard');
            }
        },
    },
};
</script>
