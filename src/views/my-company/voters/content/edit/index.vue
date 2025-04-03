<template>
    <div class="ap-card-content">
            
        <main-component v-if="$route.meta.subPage === 'main'" />

    </div>
</template>

<script>
import MainComponent from './main';

export default
{
    name: 'Edit',

    components:
    {
        MainComponent,
    },
};
</script>
