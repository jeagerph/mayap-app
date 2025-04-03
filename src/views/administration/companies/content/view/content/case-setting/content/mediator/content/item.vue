<template>
    <div class="accordion-item">
        <h2 class="accordion-header" id="form-primary">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse-form-primary-${form.keyword}`" aria-expanded="false" :aria-controls="`collapse-form-primary-${form.keyword}`">

                <span>
                    <i class="lni lni-empty-file ap-margin-right"></i> {{form.name}}
                </span>

            </button>
        </h2>
        <div :id="`collapse-form-primary-${form.keyword}`" class="accordion-collapse collapse" aria-labelledby="form-primary" data-bs-parent="#form-accordion-mediator" style="">
            <div class="accordion-body">

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="submitLoading"
                    :label="'* Name of Document'"
                    v-model="form.name"
                    :error="hasError(`mediator.${$vnode.key}.name`) ? errors[`mediator.${$vnode.key}.name`][0] : ''" />


                <p class="ap-text-primary ap-text-bold">
                    HEADER
                </p>
                
                <ap-input
                    type="text"
                    :required="true"
                    :readonly="submitLoading"
                    :label="'* Title '"
                    v-model="form.header.title"
                    :error="hasError(`mediator.${$vnode.key}.header.title`) ? errors[`mediator.${$vnode.key}.header.title`][0] : ''" />

                <p class="ap-text-primary ap-text-bold">
                    CONTENT
                </p>

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="submitLoading"
                    :label="'* Title '"
                    v-model="form.content.title"
                    :error="hasError(`mediator.${$vnode.key}.content.title`) ? errors[`mediator.${$vnode.key}.content.title`][0] : ''" />

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="submitLoading"
                    :label="'* Subtitle '"
                    v-model="form.content.subtitle"
                    :error="hasError(`mediator.${$vnode.key}.content.subtitle`) ? errors[`mediator.${$vnode.key}.content.subtitle`][0] : ''" />

                <p class="ap-text-bold ap-text-primary">
                    DOCUMENT APPROVALS
                </p>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <div class="ap-margin">
                            <select class="ap-select"
                                v-if="!isLoading('accounts')"
                                @change="selectAccount"
                                v-model="selectedAccountId">
                                <option :value="''" disabled>-- select account --</option>
                                <option
                                    v-for="(item, index) in accounts"
                                    :key="index"
                                    :value="item.id">
                                    {{item.account.full_name}}
                                </option>
                            </select>
                            <ap-placeholder
                                v-else
                                :size="'medium'"/>
                        </div>

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Approval Label'"
                            :placeholder="'ex. ATTESTED BY:'"
                            v-model="form.approval.left.label"
                            />

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Name'"
                            :placeholder="'ex. JUAN DELA CRUZ'"
                            v-model="form.approval.left.name"
                            />

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Position'"
                            :placeholder="'ex. ADMIN OFFICER'"
                            v-model="form.approval.left.position"
                            />
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
                        <div class="ap-margin">
                            <select class="ap-select"
                                v-if="!isLoading('officials')"
                                @change="selectOfficial"
                                v-model="selectedOfficialId">
                                <option :value="''" disabled>-- select official --</option>
                                <option
                                    v-for="(item, index) in officials"
                                    :key="index"
                                    :value="item.id">
                                    {{item.prefix.toUpperCase()}} {{item.name.toUpperCase()}}
                                </option>
                            </select>
                            <ap-placeholder
                                v-else
                                :size="'medium'"/>
                        </div>

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Approval Label'"
                            :placeholder="'ex. APPROVED BY:'"
                            v-model="form.approval.right.label"
                            />

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Name'"
                            :placeholder="'ex. HON. JUAN DELA CRUZ'"
                            v-model="form.approval.right.name"
                            />

                        <ap-input
                            type="text"
                            :readonly="submitLoading"
                            :label="'Position'"
                            :placeholder="'ex. ADMIN OFFICER'"
                            v-model="form.approval.right.position"
                            />

                    </div>
                </ap-grid>

                <p class="ap-text-bold ap-text-primary">
                    DOCUMENT FILE
                </p>

                <ap-input
                    type="text"
                    :required="true"
                    :readonly="submitLoading"
                    :label="'* File Path'"
                    :placeholder="'ex. default'"
                    v-model="form.path"
                    :error="hasError(`mediator.${$vnode.key}.path`) ? errors[`mediator.${$vnode.key}.path`][0] : ''"/>

                <ap-grid :gutter="'small'">
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* File'"
                            :placeholder="'ex. default'"
                            v-model="form.view.index"
                            :error="hasError(`mediator.${$vnode.key}.view.index`) ? errors[`mediator.${$vnode.key}.view.index`][0] : ''"/>
                    </div>
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* Header'"
                            :placeholder="'ex. default.header'"
                            v-model="form.view.header"
                            :error="hasError(`mediator.${$vnode.key}.view.header`) ? errors[`mediator.${$vnode.key}.view.header`][0] : ''"/>
                    </div>
                    
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* Content'"
                            :placeholder="'ex. default.content'"
                            v-model="form.view.content"
                            :error="hasError(`mediator.${$vnode.key}.view.content`) ? errors[`mediator.${$vnode.key}.view.content`][0] : ''"/>
                    </div>
                    
                    <div class="ap-width-1-1@s ap-width-1-4@m ap-width-1-4@l">
                        <ap-input
                            type="text"
                            :required="true"
                            :readonly="submitLoading"
                            :label="'* Footer'"
                            :placeholder="'ex. default.footer'"
                            v-model="form.view.footer"
                            :error="hasError(`mediator.${$vnode.key}.view.footer`) ? errors[`mediator.${$vnode.key}.view.footer`][0] : ''"/>
                    </div>
                </ap-grid>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default
{
    props:
    {
        form: Object
    },

    data()
    {
        return {
            selectedAccountId: '',
            selectedOfficialId: '',
        };
    },

    computed:
    {
        ...mapGetters({
            officials: 'adminBarangay/officials',
            accounts: 'adminBarangay/accounts',
            isLoading: 'adminBarangay/isLoading'
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

        submitLoading()
        {
            return this.$parent.$data.submitLoading;
        },
    },

    methods:
    {
        selectAccount(event)
        {
            let id = event.target.value;

            let account = this.accounts.find(row => row.id == id);

            if (account)
            {
                this.form.approval.left.name = account.account.full_name;
                this.form.approval.left.position = account.barangay_position.name;
            }
        },

        selectOfficial(event)
        {
            let id = event.target.value;

            let official = this.officials.find(row => row.id == id);

            if (official)
            {
                this.form.approval.right.name = `${official.prefix} ${official.name}`.toUpperCase();
                this.form.approval.right.position = official.position.name.toUpperCase();
                
            }
        },

        hasError(name = null)
        {
            return this.$parent.hasError(name);
        },
    },
};
</script>
