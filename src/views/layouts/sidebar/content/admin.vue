<template>
    <ul class="metismenu" id="menu">
        <li class="menu-label">
            ADMINISTRATION
        </li>

        <router-link
            tag="li"
            to="/administration/dashboard">
            <a>
                <div class="parent-icon"><i class='bx bx-bar-chart-square'></i>
                </div>
                <div class="menu-title">Dashboard</div>
            </a>
        </router-link>

        <router-link
            tag="li"
            to="/administration/companies">
            <a>
                <div class="parent-icon"><i class='bx bx-dollar'></i>
                </div>
                <div class="menu-title">Companies</div>
            </a>
        </router-link>

        <router-link
            v-permit:access="'company-accounts-download-reports'"
            tag="li"
            to="/administration/accounts">
            <a>
                <div class="parent-icon"><i class='bx bx-user'></i>
                </div>
                <div class="menu-title">User Accounts</div>
            </a>
        </router-link>
    </ul>
    
</template>

<script>
export default
{
    
}

</script>