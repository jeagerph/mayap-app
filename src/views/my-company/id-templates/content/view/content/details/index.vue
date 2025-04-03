<template>
    <div class="ap-animate ap-animate-fade-in">
        <ap-grid>
            <div class="ap-width-1-1@s ap-width-3-5@m ap-width-3-5@l">
                <p class="ap-text-bold ap-text-primary">
                    CONTENT OF ID
                </p>

                <hr>

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

                                <div v-if="!isLoading('show')">
                                    <small class="ap-text-italic">
                                        Background Color:
                                    </small>
                                    <div>
                                        <div class="ap-inline"
                                            :style="{
                                                'background-color': view.title_background_color,
                                                'padding': '5px',
                                                'width': '100px',
                                                'height': '30px'
                                            }">
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="ap-margin-medium-top">
                    <p class="ap-text-bold ap-text-primary">
                        ID APPROVALS
                    </p>

                    <ul class="ap-list ap-list-small">
                        <li>
                            <div class="ap-card ap-card-body ap-card-default ap-padding-small">
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
                                            :src="idTemplate.left_signature"
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
                                            :src="idTemplate.right_signature"
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

            </div>
            <div class="ap-width-1-1@s ap-width-2-5@m ap-width-2-5@l">

                <p class="ap-text-bold ap-text-primary">
                    ID SETTINGS
                </p>

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
                    ID FILE
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
                    <span v-if="view.front">
                        {{view.front}}
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
                    <span v-if="view.back">
                        {{view.back}}
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
            idTemplate: 'myCompanyIdTemplate/selected',
            isLoading: 'myCompanyIdTemplate/isLoading',
        }),

        view()
        {
            return this.idTemplate.view;
        },

        content()
        {
            return this.idTemplate.content;
        },

        options()
        {
            return this.idTemplate.options;
        },

        approvals()
        {
            return this.idTemplate.approvals;
        },

        expirationDate()
        {
            return Dater.format(this.idTemplate.options.expiration_date.specific);
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