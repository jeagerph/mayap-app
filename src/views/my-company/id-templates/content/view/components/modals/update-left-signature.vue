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
                <p class="ap-text-italic">
                    Important Note: Make sure to select a non-background image (PNG file format)
                </p>
                <label class="ap-upload-label-button" for="upload-left-signature-image">Select Signature</label>
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
                    v-if="!isLoading('update')"
                    type="button"
                    class="ap-margin-small-right"
                    :rounded="true"
                    @click="closeModal()">
                    Cancel
                </ap-button>
                <ap-button
                    :color="'primary'"
                    :loading="isLoading('update')"
                    :rounded="true"
                    @click="upload()">
                    Upload
                </ap-button>
            </div>
        </ap-modal-body>
    </ap-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
        };
    },

    computed:
    {
        ...mapGetters({
            idTemplate: 'myCompanyIdTemplate/selected',
            isLoading: 'myCompanyIdTemplate/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyIdTemplate/update',
        }),

        async upload()
        {
            const options = {
                format: 'png',
                circle: false,
            };

            const formPhoto = {
                photo: '',
            };

            await this.$refs.leftSignatureRef.result(options, (output) =>
            {
                formPhoto.photo = output;
            });

            const response = await this.update({
                url: `/my-company/id-template/${this.$route.params.id}/left-signature`,
                form: formPhoto,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Signature has been updated.'
                });
            }
            else if (response.status == 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    message: 'Photo is required.'
                });
            }
            else if (response.status === 403)
            {
                let message = 'Sorry, you cannot perform this action.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else if (response.status === 404)
            {
                let message = 'Data not found. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
            else
            {
                let message = 'Something went wrong. Please try again.';

                Toast.error({
                    message: response.data.error.description
                        ? response.data.error.description
                        : message,
                });
            }
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
