<template>
    <div>

        <div class="ap-animate ap-animate-fade-in">
            
            <list-component v-if="$route.meta.page === 'list'" />
            
            <view-component v-else-if="$route.meta.page === 'view'" />

            <create-component v-else-if="$route.meta.page === 'create'" />

            <edit-component v-else-if="$route.meta.page === 'edit'" />

            <network-component v-else-if="$route.meta.page === 'network'" />

            <map-component v-else-if="$route.meta.page === 'map'" />

        </div>
    </div>
</template>

<script>

import ListComponent from './content/list';
import ViewComponent from './content/view';
import CreateComponent from './content/create';
import EditComponent from './content/edit';
import NetworkComponent from './content/network';
import MapComponent from './content/map';

export default
{
    name: 'CompanyBeneficiaries',

    components:
    {
        ListComponent,
        ViewComponent,
        CreateComponent,
        EditComponent,
        NetworkComponent,
        MapComponent,
    },
};
</script>
