<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateLeftSignatureModal"
        :isCenter="true">
        <ap-modal-body>
            <ap-modal-title>
                Update Left Signature
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top ap-margin-bottom ap-text-center">
                <label class="ap-upload-label-button" for="upload-left-signature-image">Select Photo</label>
                <input class="ap-display-none" id="upload-left-signature-image" type="file" accept="image/**" @change="onFileChange">
                <ap-input
                    class="ap-display-none"
                    type="file"
                    accept="image/**" />
            </div>

            <vue-croppie
                class="ap-margin-auto"
                ref="leftSignatureRef"
                :boundary="{ width: 300, height: 150 }"
                :viewport="{ width: 280, height: 130 }"
                :enableResize="false"
                :enableOrientation="true"
                :mouseWheelZoom="false"
                @result="result">
            </vue-croppie>

            <div class="ap-margin-small-top ap-text-center">
                <ap-button
                    class="ap-margin-small-right"
                    data-tooltip="Rotate Left"
                    :color="'secondary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="rotate(90)">
                    <i class="lni lni-arrow-left"></i>
                </ap-button>

                <ap-button
                    data-tooltip="Rotate Right"
                    :color="'secondary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="rotate(-90)">
                    <i class="lni lni-arrow-right"></i>
                </ap-button>
            </div>

            <div class="ap-margin-top ap-text-center"
                v-if="hasError('photo')">
                <small class="ap-text-bold ap-text-danger">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors.photo[0]}}
                </small>
            </div>

            <div class="ap-margin-top ap-text-right">
                <ap-button
                    v-if="!submitLoading"
                    type="button"
                    class="ap-margin-small-right"
                    :rounded="true"
                    @click="closeModal()">
                    Cancel
                </ap-button>
                <ap-button
                    :color="'primary'"
                    :loading="submitLoading"
                    :rounded="true"
                    @click="upload()">
                    Upload
                </ap-button>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { Toast, Form } from '@/utils';

export default
{
    // mounted()
    // {
    //     this.$refs.leftSignatureRef.bind({
    //         url: '/static/dummy/avatar-default.jpg',
    //     });
    // },

    data()
    {
        return {
            errors: {},
            
            cropped: '',

            submitLoading: false,
        };
    },

    methods:
    {

        async upload()
        {
            const options = {
                format: 'png',
                circle: false,
            };

            await this.$refs.leftSignatureRef.result(options, (output) =>
            {
                this.$parent.$data.form.left_signature = output;
                this.$parent.$data.form.left_signature_for_upload = true;
            });

            this.closeModal();
        },

        onFileChange(e)
        {
            const files = e.target.files || e.dataTransfer.files;
            const vm = this;

            this.renderPhoto(files[0], (response) =>
            {
                vm.$refs.leftSignatureRef.bind({
                    url: response,
                });
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
            this.$refs.leftSignatureRef.rotate(rotationAngle);
        },

        result(output)
        {
            this.cropped = output;
        },

        closeModal()
        {
            this.$parent.toggleModal('updateLeftSignature', false);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
