<template>
    <div class="card card-body ap-padding ap-card-content">

        <ap-card-empty
                :label="'No record yet'"/>

    </div>
</template>

<script>

export default
{
    name: 'CompanyRewards',

    created()
    {
        window.scrollTo(0,0);
        
        this.onLoad();
    },
};
</script>
