<template>
    <ap-modal
        :isOpen.sync="$parent.$data.updateAvatarModal"
        :isCenter="true">
        <ap-modal-body>
            <ap-modal-title>
                Change Avatar
            </ap-modal-title>

            <hr class="ap-margin-small-top">

            <div class="ap-margin-top ap-margin-bottom ap-text-center">
                <label class="ap-upload-label-button" for="upload-2by2-image">Select Photo</label>
                <input class="ap-display-none" id="upload-2by2-image" type="file" accept="image/**" @change="onFileChange">
                <ap-input
                    class="ap-display-none"
                    type="file"
                    accept="image/**" />
            </div>

            <vue-croppie
                class="ap-margin-auto"
                ref="croppieRef"
                :boundary="{ width: 300, height: 300 }"
                :viewport="{ width: 200, height: 200, type: 'square' }"
                :enableResize="false"
                :enableOrientation="true"
                :mouseWheelZoom="false"
                @result="result">
            </vue-croppie>

            <div class="ap-margin-small-top ap-text-center">
                <ap-button
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
                    :outline="true"
                    @click="closeModal()">
                    Cancel
                </ap-button>
                <ap-button
                    :color="'primary'"
                    :loading="isLoading('update')"
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
    //     this.$refs.croppieRef.bind({
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
            accessUser: 'auth/accessUser',
            isLoading: 'auth/isLoading',
        }),
    },

    methods:
    {
        ...mapActions({
            update: 'auth/update',
        }),

        async upload()
        {
            this.errors = {};

            const options = {
                format: 'png',
                circle: false,
            };

            const formPhoto = {
                photo: '',
            };

            await this.$refs.croppieRef.result(options, (output) =>
            {
                formPhoto.photo = output;
            });

            const response = await this.update({
                url: '/my-account/photo',
                form: formPhoto,
            });

            if (response.status === 200)
            {
                this.closeModal();

                Toast.success({
                    message: 'Avatar photo has been changed.'
                });
            }
            else if (response.status == 422)
            {
                this.errors = response.data.errors;

                Toast.error({
                    title: 'Form Validation',
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
                vm.$refs.croppieRef.bind({
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
            this.$refs.croppieRef.rotate(rotationAngle);
        },

        result(output)
        {
            this.cropped = output;
        },

        closeModal()
        {
            this.$parent.toggleModal('updateAvatar', false);
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },
    },
};
</script>
