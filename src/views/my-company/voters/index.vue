<template>
    <div>

        <div class="ap-animate ap-animate-fade-in">
            
            <list-component v-if="$route.meta.page === 'list'" />
            
            <view-component v-else-if="$route.meta.page === 'view'" />

            <create-component v-else-if="$route.meta.page === 'create'" />

            <edit-component v-else-if="$route.meta.page === 'edit'" />

        </div>
    </div>
</template>

<script>

import ListComponent from './content/list';
import ViewComponent from './content/view';
import CreateComponent from './content/create';
import EditComponent from './content/edit';

export default
{
    name: 'CompanyVoters',

    components:
    {
        ListComponent,
        ViewComponent,
        CreateComponent,
        EditComponent,
    },
};
</script>
