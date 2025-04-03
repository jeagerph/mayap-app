<template>
    <footer class="page-footer">

        <p class="mb-0" style="font-size: 11px;">© {{currentYear}} All Rights Reserved &middot; Developed and Maintained by PrimeX Ventures Inc.</p>
        <p class="mb-0" style="font-size: 10px;">{{appName}} {{appVersion}}</p>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    computed:
    {
        ...mapGetters({
            accessUser: 'auth/accessUser',
        }),

        appName()
        {
            return process.env.APP_NAME;
        },

        appVersion()
        {
            return process.env.APP_VERSION;
        },

        currentYear()
        {
            let date = new Date();

            return date.getFullYear();
        },

        isCompany()
        {
            return this.accessUser.account_type.id == 2;
        },
    },
};
</script>
