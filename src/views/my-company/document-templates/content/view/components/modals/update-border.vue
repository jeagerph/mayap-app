<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateBorderModal"
        :isCenter="true"
        :size="'container'">
        <ap-modal-body>
            <ap-modal-title>
                Update Document Border
            </ap-modal-title>

            <hr class="ap-margin-small-top">

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
    //     this.$refs.borderRef.bind({
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
            template: 'myCompanyDocumentTemplate/selected',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'myCompanyDocumentTemplate/update',
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

            await this.$refs.borderRef.result(options, (output) =>
            {
                formPhoto.photo = output;
            });

            const response = await this.update({
                url: `/my-company/document-template/${this.$route.params.id}/border`,
                form: formPhoto,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Border has been updated.'
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
                vm.$refs.borderRef.bind({
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
            this.$refs.borderRef.rotate(rotationAngle);
        },

        result(output)
        {
            this.cropped = output;
        },

        closeModal()
        {
            this.$parent.toggleModal('updateBorder', false);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
