<template>
    <div class="ap-card-content">
            
        <main-component v-if="$route.meta.subPage === 'main'" />

        <document-component v-else-if="$route.meta.subPage === 'document'" />

    </div>
</template>

<script>
import MainComponent from './main';
import DocumentComponent from './document';

export default
{
    name: 'Create',

    components:
    {
        MainComponent,
        DocumentComponent,
    },
};
</script>
