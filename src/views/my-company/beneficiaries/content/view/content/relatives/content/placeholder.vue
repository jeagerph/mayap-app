<template>
    <div class="ap-margin-top">
        <ap-grid :gutter="'small'"
            class="ap-flex-middle">
            <div class="ap-width-fit-content">
                <ap-placeholder
                    class="ap-placeholder-image-circle"
                    :type="'image'"
                    :width="'48px'"
                    :height="'48px'" />
            </div>
            <div class="ap-width-expand">
                <ap-placeholder
                    :size="'medium'" />
                <ap-placeholder
                    :size="'small'"
                    :width="'75%'" />
            </div>
        </ap-grid>
    </div>
</template>