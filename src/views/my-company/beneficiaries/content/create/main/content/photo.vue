<template>
    <div class="ap-margin-top">

        <div class="ap-text-center">
            <ap-button
                type="button"
                :color="'primary'"
                @click="openModal('photo')">
                CAPTURE PHOTO
            </ap-button>

            <div class="ap-margin-small-top ap-margin-small-bottom">
                - OR -
            </div>

            <div>
                <label class="ap-upload-label-button" for="upload-resident-image">Select Photo</label>
                <input class="ap-display-none" id="upload-resident-image" type="file" accept="image/**" @change="onFileChange">
                <ap-input
                    class="ap-display-none"
                    type="file"
                    accept="image/**" />
            </div>
        </div>

        <div class="ap-margin-top ap-text-center">
            <vue-croppie
                ref="residentRef"
                :boundary="{ width: 250, height: 250 }"
                :viewport="{ width: 225, height: 225, type: 'square' }"
                :enableResize="false"
                :enableOrientation="true"
                :mouseWheelZoom="false"
                @result="result">
            </vue-croppie>

            <div>
                <ap-button
                    type="button"
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
                    type="button"
                    data-tooltip="Rotate Right"
                    :color="'secondary'"
                    :size="'small'"
                    :outline="true"
                    :rounded="true"
                    @click="rotate(-90)">
                    <i class="lni lni-arrow-right"></i>
                </ap-button>
            </div>

            <div class="ap-margin-small-top">
                <ap-button
                    type="button"
                    :color="'danger'"
                    :size="'small'"
                    :outline="true"
                    @click="remove()">
                    RESET
                </ap-button>
            </div>

            <div class="ap-margin-top ap-text-center"
                v-if="hasError('photo')">
                <small class="ap-text-bold ap-text-danger">
                    <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                    {{errors.photo[0]}}
                </small>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{

    data()
    {
        return {
            cropped: '',
        };
    },

    computed:
    {
        ...mapGetters({
            isLoading: 'companyMember/isLoading',
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
        onFileChange(e)
        {
            const files = e.target.files || e.dataTransfer.files;

            const vm = this;

            this.renderPhoto(files[0], (response) =>
            {
                this.$refs.residentRef.bind({
                    url: response,
                });

                vm.$parent.$data.changedPhoto = true;

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
            this.$refs.residentRef.rotate(rotationAngle);
        },

        remove()
        {
            this.cropped = '';

            this.$refs.residentRef.refresh();

            this.$parent.$data.changedPhoto = false;
        },

        result(output)
        {
            this.cropped = output;
        },

        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
        
        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
