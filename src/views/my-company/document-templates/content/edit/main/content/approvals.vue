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
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Name'"
                    :placeholder="'ex. JUAN DELA CRUZ'"
                    v-model="form.approvals.left_approval.name"
                    :error="hasError('approvals.left_approval.name') ? errors['approvals.left_approval.name'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Name
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>

                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Position'"
                    :placeholder="'ex. ADMIN OFFICER'"
                    v-model="form.approvals.left_approval.position"
                    :error="hasError('approvals.left_approval.position') ? errors['approvals.left_approval.position'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Position
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
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
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Name'"
                    :placeholder="'ex. HON. JUAN DELA CRUZ'"
                    v-model="form.approvals.right_approval.name"
                    :error="hasError('right_approval.name') ? errors['right_approval.name'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Name
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
                </div>

                <ap-input
                    v-if="!isLoading('edit')"
                    type="text"
                    :readonly="isLoading('update')"
                    :label="'Position'"
                    :placeholder="'ex. ADMIN OFFICER'"
                    v-model="form.approvals.right_approval.position"
                    :error="hasError('right_approval.position') ? errors['right_approval.position'][0] : ''"/>
                <div v-else>
                    <label class="ap-form-label ap-text-bold">
                        Position
                    </label>
                    <ap-placeholder
                        :size="'medium'"/>
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
        };
    },

    computed:
    {
        ...mapGetters({
            form: 'myCompanyDocumentTemplate/editForm',
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

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },

    watch:
    {
        form()
        {
            this.loadAssignatories();
        },
    },
};
</script>
