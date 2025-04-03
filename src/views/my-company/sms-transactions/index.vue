<template>
    <div>

        <div class="ap-animate ap-animate-fade-in">
            
            <list-component v-if="$route.meta.page === 'list'" />
            
            <view-component v-else-if="$route.meta.page === 'view'" />

        </div>
    </div>
</template>

<script>

import ListComponent from './content/list';
import ViewComponent from './content/view';

export default
{
    name: 'CompanySmsTransactions',

    components:
    {
        ListComponent,
        ViewComponent,
    },
};
</script>
