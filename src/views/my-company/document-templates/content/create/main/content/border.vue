<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            DOCUMENT BORDER
        </p>

        <p class="ap-text-italic">
            Important Note: Make sure to select a non-background image (PNG file format) with a proper dimension of a border image.
        </p>
        <div class="ap-margin-top ap-margin-bottom ap-text-center">
            <label class="ap-upload-label-button" for="upload-border-image">Select Image</label>
            <input class="ap-display-none" id="upload-border-image" type="file" accept="image/**" @change="onFileChange">
            <ap-input
                class="ap-display-none"
                type="file"
                accept="image/**" />
        </div>

        <vue-croppie
            class="ap-margin-auto"
            ref="borderRef"
            :boundary="{ width: 800, height: 70 }"
            :viewport="{ width: 780, height: 50, type: 'square' }"
            :enableResize="false"
            :enableOrientation="true"
            :mouseWheelZoom="false"
            @result="result">
        </vue-croppie>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default
{
    data()
    {
        return {
            borderResult: '',
        };
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),

        errors:
        {
            get()
            {
                return this.$parent.$data.errors;
            },

            set(value)
            {
                this.$parent.$data.errors = value;
            },
        },

        form()
        {
            return this.$parent.$data.form;
        },
    },

    methods:
    {
        onFileChange(event)
        {
            const files = event.target.files || event.dataTransfer.files;
            const vm = this;

            this.renderPhoto(files[0], (response) =>
            {
                vm.$refs.borderRef.bind({
                    url: response,
                });

                vm.$parent.$data.form.header_border_for_upload = true;
            });
        },

        renderPhoto(file, callback)
        {
            const reader = new FileReader();
            reader.onload = (data) =>
            {
                callback(data.target.result);
            };
            reader.readAsDataURL(file);
        },

        rotate(rotationAngle)
        {
            this.$refs.borderRef.rotate(rotationAngle);
        },

        result(output)
        {
            this.borderResult = output;
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
