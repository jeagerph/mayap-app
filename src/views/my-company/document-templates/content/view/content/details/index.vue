<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid>
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                <p class="ap-text-bold ap-text-primary">
                    CONTENT OF DOCUMENT
                </p>

                <div class="ap-margin-small-top">

                    <div v-if="!isLoading('show')"
                        class="ap-preview-content"
                        v-html="content.body"></div>
                    <div v-else>
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                    </div>
                </div>

                <hr>

                <div class="ap-margin-top">
                    <p class="ap-text-bold ap-text-primary">
                        TITLE & SALUTATION INPUTS OF THE DOCUMENT
                    </p>

                    <div class="ap-margin-small-top">
                        <ul class="ap-list ap-list-small">
                            <li>
                                <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                    <small class="ap-text-bold">
                                        TITLE
                                    </small>
                                    <p v-if="!isLoading('show')">
                                        <span v-if="content.title">
                                            {{content.title}}
                                        </span>
                                        <span class="ap-text-italic" v-else>
                                            No default value
                                        </span>
                                    </p>
                                    <ap-placeholder
                                        v-else
                                        :size="'medium'" />
                                </div>
                            </li>
                            <li>
                                <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                    <small class="ap-text-bold">
                                        SALUTATION
                                    </small>
                                    <p v-if="!isLoading('show')">
                                        <span v-if="content.salutation">
                                            {{content.salutation}}
                                        </span>
                                        <span class="ap-text-italic" v-else>
                                            No default value
                                        </span>
                                    </p>
                                    <ap-placeholder
                                        v-else
                                        :size="'medium'" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="ap-margin-top">
                    <p class="ap-text-bold ap-text-primary">
                        WORD/PHRASE INPUTS OF THE DOCUMENT
                    </p>
                    <div v-if="!isLoading('show')">
                        <div v-if="inputs.length">
                            <ul class="ap-list ap-list-small">
                                <li
                                    v-for="(input, index) in inputs"
                                    :key="index">
                                    <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                        <small class="ap-text-bold">
                                            {{input.label.toUpperCase()}}
                                        </small>
                                        <p>
                                            <span v-if="input.value">
                                                {{input.value}}
                                            </span>
                                            <span class="ap-text-italic" v-else>
                                                No default value
                                            </span>
                                        </p>
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                        <div class="ap-margin-top" v-else>
                            <p class="ap-text-italic">No word/phrase inputs</p>
                        </div>
                    </div>
                    <div v-else>
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                    </div>
                </div>

                <div class="ap-margin-top">
                    <p class="ap-text-bold ap-text-primary">
                        TABLE INPUTS OF THE DOCUMENT
                    </p>
                    <div v-if="!isLoading('show')">
                        <div v-if="tables.length">
                            <ul class="ap-list ap-list-small">
                                <li
                                    v-for="(table, index) in tables"
                                    :key="index">

                                    <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                        <small class="ap-text-bold">
                                            {{table.label.toUpperCase()}}
                                        </small>

                                        <div class="ap-margin-top"
                                            v-if="table.fields.length">
                                            <table border="1" class="ap-table ap-table-divider ap-table-small">
                                                <tr>
                                                    <td v-for="(field, fIndex) in table.fields"
                                                        :key="fIndex"
                                                        style="font-size: 9px;">
                                                        <small class="ap-text-bold ap-margin-small-left">
                                                            {{field.label}}
                                                        </small>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="ap-margin-small-top"
                                            v-else>
                                            <p class="ap-text-italic">
                                                No fields yet
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="ap-margin-top" v-else>
                            <p class="ap-text-italic">No table inputs</p>
                        </div>
                    </div>
                    <div v-else>
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                        <ap-placeholder
                            class="ap-margin-xsmall-top"
                            :size="'medium'" />
                    </div>
                </div>

                <div class="ap-margin-medium-top">
                    <p class="ap-text-bold ap-text-primary">
                        DOCUMENT APPROVALS
                    </p>

                    <ul class="ap-list ap-list-small">
                        <li>
                            <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                <small class="ap-text-bold"
                                    v-if="!isLoading('show')">
                                    {{approvals.left_approval.label ? approvals.left_approval.label : 'Attested By:'}}
                                </small>
                                <p class="ap-margin-remove"
                                    v-if="!isLoading('show')">
                                    <span v-if="approvals.left_approval.name">
                                        {{approvals.left_approval.name}}
                                    </span>
                                    <span class="ap-text-italic"
                                    v-else>
                                        No personnel yet
                                    </span>
                                </p>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />

                                <small class="ap-margin-remove"
                                    v-if="!isLoading('show')">
                                    <span v-if="approvals.left_approval.position">
                                        {{approvals.left_approval.position}}
                                    </span>
                                    <span class="ap-text-italic"
                                    v-else>
                                        No position
                                    </span>
                                </small>
                                <ap-placeholder
                                    v-else
                                    :size="'small'" />

                                <div v-if="!isLoading('show')">
                                    <div v-if="options.with_left_approval_signature"
                                        class="ap-margin-top">
                                        <ap-signature
                                            :shape="'default'"
                                            :src="template.left_signature"
                                            :label="'LS'" />
                                        <div>
                                            <ap-button
                                                :color="'warning'"
                                                :size="'small'"
                                                :outline="true"
                                                @click="openModal('updateLeftSignature')">
                                                UPDATE SIGNATURE
                                            </ap-button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />
                            </div>
                        </li>
                        <li>
                            <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                                <small class="ap-text-bold"
                                    v-if="!isLoading('show')">
                                    {{approvals.right_approval.label ? approvals.right_approval.label : 'Approved By:'}}
                                </small>
                                <p class="ap-margin-remove"
                                    v-if="!isLoading('show')">
                                    <span v-if="approvals.right_approval.name">
                                        {{approvals.right_approval.name}}
                                    </span>
                                    <span class="ap-text-italic"
                                    v-else>
                                        No personnel yet
                                    </span>
                                </p>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />

                                <small class="ap-margin-remove"
                                    v-if="!isLoading('show')">
                                    <span v-if="approvals.right_approval.position">
                                        {{approvals.right_approval.position}}
                                    </span>
                                    <span class="ap-text-italic"
                                    v-else>
                                        No position
                                    </span>
                                </small>
                                <ap-placeholder
                                    v-else
                                    :size="'small'" />

                                <div v-if="!isLoading('show')">
                                    <div v-if="options.with_right_approval_signature"
                                        class="ap-margin-top">
                                        <ap-signature
                                            :shape="'default'"
                                            :src="template.right_signature"
                                            :label="'RS'" />
                                        <div>
                                            <ap-button
                                                :color="'warning'"
                                                :size="'small'"
                                                :outline="true"
                                                @click="openModal('updateRightSignature')">
                                                UPDATE SIGNATURE
                                            </ap-button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <ap-placeholder
                                    v-else
                                    :size="'medium'" />
                            </div>
                        </li>
                    </ul>

                </div>

                <div class="ap-margin-medium-top">
                    <p class="ap-text-bold ap-text-primary">
                        DOCUMENT BORDER
                    </p>

                    <div class="ap-card ap-card-body ap-card-default ap-padding-small">
                        <div v-if="!isLoading('show')">
                            <img v-if="template.header_border"
                                :src="template.header_border" />

                            <p class="ap-text-italic"
                                v-else>
                                Default border
                            </p>

                            <div>
                                <ap-button
                                    :color="'warning'"
                                    :size="'small'"
                                    :outline="true"
                                    @click="openModal('updateBorder')">
                                    UPDATE BORDER
                                </ap-button>
                            </div>
                        </div>
                        <ap-placeholder
                            v-else
                            :size="'medium'" />
                        
                    </div>
                </div>

            </div>
            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">
                <p class="ap-text-bold ap-text-primary">
                    DOCUMENT SETTINGS
                </p>

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_document_no"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_document_no"></i>
                    SHOW DOCUMENT NO
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_qr_code"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_qr_code"></i>
                    SHOW QR CODE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_issuance_date"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_issuance_date"></i>
                    SHOW ISSUANCE DATE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />
                
                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_expiration_date"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_expiration_date"></i>
                    SHOW EXPIRATION DATE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />
                
                <div v-if="!isLoading('show') && options.with_expiration_date">
                    <small class="ap-text-italic">
                        Set Expiration Date:
                    </small>
                    <p v-if="options.expiration_date.default == 'months'">
                        <i class="lni lni-checkmark ap-margin-right ap-text-success"></i>
                        + {{options.expiration_date.months}} month(s) from Issuance Date
                    </p>
                    <p v-else-if="options.expiration_date.default == 'specific'">
                        <i class="lni lni-checkmark ap-margin-right ap-text-success"></i>
                        {{expirationDate}} specific date
                    </p>
                </div>

                <p class="ap-text-bold ap-text-primary ap-margin-top">
                    APPLICANT SETTINGS
                </p>

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_applicant_photo"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_applicant_photo"></i>
                    SHOW APPLICANT PHOTO
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_applicant_signature"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_applicant_signature"></i>
                    SHOW APPLICANT SIGNATURE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />


                <p class="ap-text-bold ap-text-primary ap-margin-top">
                    APPROVAL SETTINGS
                </p>


                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_left_approval"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_left_approval"></i>
                    SHOW LEFT APPROVAL
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_left_approval_signature"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_left_approval_signature"></i>
                    SHOW LEFT APPROVAL SIGNATURE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />
                
                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_right_approval"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_right_approval"></i>
                    SHOW RIGHT APPROVAL
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />
                
                <p v-if="!isLoading('show')">
                    <i class="lni lni-checkmark ap-margin-right ap-text-success" v-show="options.with_right_approval_signature"></i>
                    <i class="lni lni-close ap-margin-right ap-text-danger" v-show="!options.with_right_approval_signature"></i>
                    SHOW RIGHT APPROVAL SIGNATURE
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p class="ap-text-bold ap-text-primary">
                    DOCUMENT FILE
                </p>

                <p v-if="!isLoading('show')">
                    <i class="lni lni-empty-file ap-margin-right"></i>
                    <span v-if="view.index">
                        {{view.index}}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        Not Indicated
                    </span>
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-empty-file ap-margin-right"></i>
                    <span v-if="view.header">
                        {{view.header}}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        Not Indicated
                    </span>
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-empty-file ap-margin-right"></i>
                    <span v-if="view.sidebar">
                        {{view.sidebar}}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        Not Indicated
                    </span>
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-empty-file ap-margin-right"></i>
                    <span v-if="view.content">
                        {{view.content}}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        Not Indicated
                    </span>
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />

                <p v-if="!isLoading('show')">
                    <i class="lni lni-empty-file ap-margin-right"></i>
                    <span v-if="view.footer">
                        {{view.footer}}
                    </span>
                    <span class="ap-text-italic"
                        v-else>
                        Not Indicated
                    </span>
                </p>
                <ap-placeholder
                    v-else
                    :size="'small'" />
            </div>
        </ap-grid>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Dater } from '@/utils';

export default
{
    computed:
    {
        ...mapGetters({
            template: 'myCompanyDocumentTemplate/selected',
            isLoading: 'myCompanyDocumentTemplate/isLoading',
        }),

        view()
        {
            return this.template.view;
        },

        content()
        {
            return this.template.content;
        },

        options()
        {
            return this.template.options;
        },

        inputs()
        {
            return this.template.inputs;
        },

        tables()
        {
            return this.template.tables;
        },

        approvals()
        {
            return this.template.approvals;
        },

        expirationDate()
        {
            return Dater.format(this.template.options.expiration_date.specific);
        },
    },

    methods:
    {
        openModal(name)
        {
            this.$parent.toggleModal(name, true);
        },
    },
};
</script>