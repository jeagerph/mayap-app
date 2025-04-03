<template>
    <div class="ap-margin-medium-top">
        <p class="ap-text-bold ap-text-primary">
            DOCUMENT APPROVALS
        </p>

        <ap-grid :gutter="'small'">
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div class="ap-margin">
                    <select class="ap-select"
                        v-if="!isLoading('assignatories')"
                        @change="selectLeftAssignatory"
                        v-model="selectedLeftAssignatoryId">
                        <option :value="''" disabled>-- select assignatory --</option>
                        <option
                            v-for="(item, index) in assignatories"
                            :key="index"
                            :value="item.id">
                            {{item.name}}
                        </option>
                    </select>
                    <ap-placeholder
                        v-else
                        :size="'medium'"/>
                </div>

                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Name'"
                    :placeholder="'ex. JUAN DELA CRUZ'"
                    v-model="form.approvals.left_approval.name"
                    :error="hasError('approvals.left_approval.name') ? errors['approvals.left_approval.name'][0] : ''"/>

                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Position'"
                    :placeholder="'ex. ADMIN OFFICER'"
                    v-model="form.approvals.left_approval.position"
                    :error="hasError('approvals.left_approval.position') ? errors['approvals.left_approval.position'][0] : ''"/>

                <div v-show="form.options.with_left_approval_signature">
                    <p class="ap-text-italic">
                        Important Note: Make sure to select a non-background image (PNG file format)
                    </p>
                    <div class="ap-margin-top ap-margin-bottom ap-text-center">
                        <label class="ap-upload-label-button" for="upload-left-signature">Select Signature</label>
                        <input class="ap-display-none" id="upload-left-signature" type="file" accept="image/**" @change="onFileChange($event, 'left')">
                        <ap-input
                            class="ap-display-none"
                            type="file"
                            accept="image/**" />
                    </div>

                    <vue-croppie
                        class="ap-margin-auto"
                        ref="leftSignatureRef"
                        :boundary="{ width: 300, height: 150 }"
                        :viewport="{ width: 280, height: 130, type: 'square' }"
                        :enableResize="false"
                        :enableOrientation="true"
                        :mouseWheelZoom="false"
                        @result="result($event, 'left')">
                    </vue-croppie>

                    <div class="ap-margin-small-top ap-text-center">
                        <ap-button
                            class="ap-margin-small-right"
                            data-tooltip="Rotate Left"
                            type="button"
                            :color="'default'"
                            :size="'small'"
                            :outline="true"
                            :rounded="true"
                            @click="rotate(90, 'left')">
                            <i class="lni lni-arrow-left"></i>
                        </ap-button>

                        <ap-button
                            data-tooltip="Rotate Right"
                            type="button"
                            :color="'default'"
                            :size="'small'"
                            :outline="true"
                            :rounded="true"
                            @click="rotate(-90, 'left')">
                            <i class="lni lni-arrow-right"></i>
                        </ap-button>
                    </div>

                    <div class="ap-margin-top ap-text-center"
                        v-if="hasError('approvals.left_approval.signature')">
                        <small class="ap-text-bold ap-text-danger">
                            <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                            {{errors['approvals.left_approval.signature'][0]}}
                        </small>
                    </div>
                </div>
            </div>
            <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                <div class="ap-margin">
                    <select class="ap-select"
                        v-if="!isLoading('assignatories')"
                        @change="selectRightAssignatory"
                        v-model="selectedRightAssignatoryId">
                        <option :value="''" disabled>-- select assignatory --</option>
                        <option
                            v-for="(item, index) in assignatories"
                            :key="index"
                            :value="item.id">
                            {{item.name}}
                        </option>
                    </select>
                    <ap-placeholder
                        v-else
                        :size="'medium'"/>
                </div>

                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Name'"
                    :placeholder="'ex. HON. JUAN DELA CRUZ'"
                    v-model="form.approvals.right_approval.name"
                    :error="hasError('right_approval.name') ? errors['right_approval.name'][0] : ''"/>

                <ap-input
                    type="text"
                    :readonly="isLoading('store')"
                    :label="'Position'"
                    :placeholder="'ex. ADMIN OFFICER'"
                    v-model="form.approvals.right_approval.position"
                    :error="hasError('right_approval.position') ? errors['right_approval.position'][0] : ''"/>

                <div v-show="form.options.with_right_approval_signature">
                    <p class="ap-text-italic">
                        Important Note: Make sure to select a non-background image (PNG file format)
                    </p>
                    <div class="ap-margin-top ap-margin-bottom ap-text-center">
                        <label class="ap-upload-label-button" for="upload-right-signature">Select Signature</label>
                        <input class="ap-display-none" id="upload-right-signature" type="file" accept="image/**" @change="onFileChange($event, 'right')">
                        <ap-input
                            class="ap-display-none"
                            type="file"
                            accept="image/**" />
                    </div>

                    <vue-croppie
                        class="ap-margin-auto"
                        ref="rightSignatureRef"
                        :boundary="{ width: 300, height: 150 }"
                        :viewport="{ width: 280, height: 130, type: 'square' }"
                        :enableResize="false"
                        :enableOrientation="true"
                        :mouseWheelZoom="false"
                        @result="result($event, 'right')">
                    </vue-croppie>

                    <div class="ap-margin-small-top ap-text-center">
                        <ap-button
                            class="ap-margin-small-right"
                            data-tooltip="Rotate Left"
                            type="button"
                            :color="'default'"
                            :size="'small'"
                            :outline="true"
                            :rounded="true"
                            @click="rotate(90, 'left')">
                            <i class="lni lni-arrow-left"></i>
                        </ap-button>

                        <ap-button
                            data-tooltip="Rotate Right"
                            type="button"
                            :color="'default'"
                            :size="'small'"
                            :outline="true"
                            :rounded="true"
                            @click="rotate(-90, 'left')">
                            <i class="lni lni-arrow-right"></i>
                        </ap-button>
                    </div>

                    <div class="ap-margin-top ap-text-center"
                        v-if="hasError('approvals.right_approval.signature')">
                        <small class="ap-text-bold ap-text-danger">
                            <i class="bx bx-info-circle ap-margin-xsmall-right"></i>
                            {{errors['approvals.right_approval.signature'][0]}}
                        </small>
                    </div>
                </div>
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default
{
    data()
    {
        return {
            selectedLeftAssignatoryId: '',
            selectedRightAssignatoryId: '',

            leftSignatureResult: '',
            rightSignatureResult: '',
        };
    },

    created()
    {
        this.loadAssignatories();
    },

    computed:
    {
        ...mapGetters({
            assignatories: 'myCompanyDocumentTemplate/assignatories',
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
        ...mapActions({
            loadPrerequisite: 'myCompanyDocumentTemplate/loadPrerequisite'
        }),

        async loadAssignatories()
        {
            this.loadPrerequisite({
                url: `/my-company/document-template/assignatory/options`,
                action: 'assignatories'
            });
        },

        selectLeftAssignatory(event)
        {
            let id = event.target.value;

            let assignatory = this.assignatories.find(row => row.id == id);

            if (assignatory)
            {
                this.form.approvals.left_approval.name = assignatory.name;
                this.form.approvals.left_approval.position = assignatory.position;
            }
        },

        selectRightAssignatory(event)
        {
            let id = event.target.value;

            let assignatory = this.assignatories.find(row => row.id == id);

            if (assignatory)
            {
                this.form.approvals.right_approval.name = assignatory.name;
                this.form.approvals.right_approval.position = assignatory.position;
            }
        },

        onFileChange(event, pos)
        {
            const files = event.target.files || event.dataTransfer.files;
            const vm = this;

            this.renderPhoto(files[0], (response) =>
            {
                vm.$refs[`${pos}SignatureRef`].bind({
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

        rotate(rotationAngle, pos)
        {
            this.$refs[`${pos}SignatureRef`].rotate(rotationAngle);
        },

        result(output, pos)
        {
            this[`${pos}SignatureResult`] = output;
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
