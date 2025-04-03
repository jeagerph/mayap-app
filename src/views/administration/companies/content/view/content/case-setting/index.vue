<template>
    <div class="ap-animate ap-animate-fade-in">
        
        
        <border-component />

        <committee-component />

        <update-border-modal v-if="hasCaseSetting" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Http from '@/services';

import { Form, Toast } from '@/utils';

import BorderComponent from './content/border';
import CommitteeComponent from './content/committee';

import UpdateBorderModal from './components/modals/update-border';

export default
{
    components:
    {
        BorderComponent,
        CommitteeComponent,

        UpdateBorderModal,

    },

    data()
    {
        return {
            updateBorderModal: false,

            form:
            {
                case_prefix: '',
                punong_barangay_name: '',
                punong_barangay_position: '',
                barangay_secretary_name: '',
                barangay_secretary_position: '',
                lupon_chairman_name: '',
                lupon_chairman_position: '',
                lupon_secretary_name: '',
                lupon_secretary_position: '',
                pangkat_chairman_name: '',
                pangkat_chairman_position: '',
                pangkat_secretary_name: '',
                pangkat_secretary_position: '',
                pangkat_member_name: '',
                pangkat_member_position: '',
                warrant_officer_name: '',
                warrant_officer_position: '',
            },
        };
    },

    created()
    {
        this.load();
        
        this.loadOfficials();

        this.loadMembers();

        this.loadOfficers();
    },

    computed:
    {
        ...mapGetters({
            barangay: 'adminBarangay/selected',
            caseSetting: 'adminBarangay/caseSetting',
            isLoading: 'adminBarangay/isLoading',
        }),

        hasCaseSetting()
        {
            return Object.keys(this.caseSetting).length > 0;
        }
    },

    methods:
    {
        ...mapActions({
            loadCaseSetting: 'adminBarangay/loadCaseSetting',
            loadPrerequisite: 'adminBarangay/loadPrerequisite',
            update: 'adminBarangay/updateCaseSetting',
        }),

        async submit()
        {
            this.errors = {};

            this.submitLoading = true;
            
            const response = await Http.put(
                `/administration/barangay/${this.$route.params.code}/case/setting`,
                this.form,
            );

            this.submitLoading = false;

            if (response.status === 200)
            {
                this.update(response.data);

                this.closeModal();

                Toast.success({
                    message: 'Data has been updated.'
                });
            }
            else if (response.status === 422)
            {
                this.errors = response.data.errors;
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

        async load()
        {
            const response = await this.loadCaseSetting(`/administration/barangay/${this.$route.params.code}/case/setting`);

            if (response.status == 200 || response.status == 201)
            {
                this.initialize();
            }
        },

        async loadAccounts()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/accounts/${this.$route.params.code}`,
                action: 'accounts'
            });
        },

        async loadOfficials()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/officials/${this.$route.params.code}`,
                action: 'officials'
            });
        },

        async loadMembers()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/case-members/${this.$route.params.code}`,
                action: 'members'
            });
        },

        async loadOfficers()
        {
            this.loadPrerequisite({
                url: `/administration/barangay/case-officers/${this.$route.params.code}`,
                action: 'officers'
            });
        },

        initialize()
        {
            this.form.case_prefix = this.caseSetting.case_prefix;
            this.form.punong_barangay_name = this.caseSetting.punong_barangay_name;
            this.form.punong_barangay_position = this.caseSetting.punong_barangay_position;
            this.form.barangay_secretary_name = this.caseSetting.barangay_secretary_name;
            this.form.barangay_secretary_position = this.caseSetting.barangay_secretary_position;
            this.form.lupon_chairman_name = this.caseSetting.lupon_chairman_name;
            this.form.lupon_chairman_position = this.caseSetting.lupon_chairman_position;
            this.form.lupon_secretary_name = this.caseSetting.lupon_secretary_name;
            this.form.lupon_secretary_position = this.caseSetting.lupon_secretary_position;
            this.form.pangkat_chairman_name = this.caseSetting.pangkat_chairman_name;
            this.form.pangkat_chairman_position = this.caseSetting.pangkat_chairman_position;
            this.form.pangkat_secretary_name = this.caseSetting.pangkat_secretary_name;
            this.form.pangkat_secretary_position = this.caseSetting.pangkat_secretary_position;
            this.form.pangkat_member_name = this.caseSetting.pangkat_member_name;
            this.form.pangkat_member_position = this.caseSetting.pangkat_member_position;
            this.form.warrant_officer_name = this.caseSetting.warrant_officer_name;
            this.form.warrant_officer_position = this.caseSetting.warrant_officer_position;
        },

        hasError(name = null)
        {
            return Form.hasError(this.errors, name);
        },

        toggleModal(name, bool)
        {
            this[`${name}Modal`] = bool;
        },
    },
};
</script>
