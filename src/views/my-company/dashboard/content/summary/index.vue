<template>
  <div class="ap-animate ap-animate-fade-in">
    <ap-grid :gutter="'small'">
      <!-- <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          class="ap-link-reset ap-point"
          @click="toggleModal('beneficiaries', true)"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse">
                    {{ appBeneficiaryName.toUpperCase() }}
                  </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.beneficiaries.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user-circle"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.beneficiaries.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.beneficiaries.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          class="ap-link-reset ap-point"
          @click="toggleModal('officersNetworks', true)"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> OFFICERS/LEADERS </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.officers.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.officers.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.officers.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>

      Verified voters count card
      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          class="ap-link-reset ap-point"
          @click="toggleModal('verifiedVoters', true)"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> VERIFIED VOTERS </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.verifiedVoters.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bxs-badge-check"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.verifiedVoters.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.verifiedVoters.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>

      Cross matched voters and beneficiaries count card
      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          @click="toggleModal('crossMatchedVoters', true)"
          class="ap-link-reset ap-point"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> CROSS MATCHED VOTERS </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.crossMatchedVoters.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-flag"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.crossMatchedVoters.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.crossMatchedVoters.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>




      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          @click="toggleModal('crossMatchedVoters', true)"
          class="ap-link-reset ap-point"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> ISSUED SDN CARDS </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.issuedSdnIds.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class='bx bxs-id-card'></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.issuedSdnIds.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.issuedSdnIds.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>





      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a
          class="ap-link-reset ap-point"
          @click="toggleModal('networks', true)"
        >
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> NETWORKS </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.networks.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="lni lni-network"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.networks.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.networks.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <router-link :to="`/company/incentives`">
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> INCENTIVE </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.incentives.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-award"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.incentives.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.incentives.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </router-link>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <router-link :to="`/company/assistances`">
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> ASSISTANCES </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.assistances.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user-check"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.assistances.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.assistances.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </router-link>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
        <a class="link-reset ap-point" @click="toggleModal('voterTypes', true)">
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> VOTER TYPE </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ voterTypesTotal }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ voterTypesMonth }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ voterTypesYear }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </a>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l" v-show="show">
        <router-link :to="`/company/patients`">
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> PATIENT </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.patients.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user-pin"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.patients.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.patients.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </router-link>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l" v-show="show">
        <router-link :to="`/company/beneficiaries?filter[isHousehold]=1`">
          <div class="card radius-10 bg-gradient" :class="apCardBackground">
            <div class="card-body">
              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> HOUSEHOLD </small>
                  <h4
                    class="ap-margin-remove ap-text-inverse"
                    v-if="!summaryLoading"
                  >
                    {{ summary.household.total }}
                  </h4>
                  <div class="ap-margin-small-top" v-else>
                    <ap-loader :size="'small'" :color="'primary'" />
                  </div>
                </div>
                <div class="ap-text-right">
                  <div class="ap-text-inverse ms-auto font-35">
                    <i class="bx bx-user"></i>
                  </div>
                </div>
              </ap-grid>

              <hr class="ap-text-inverse" />

              <ap-grid>
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS MONTH </small>
                </div>
                <div class="ap-text-right">
                  <h5 class="ap-text-inverse" v-if="!summaryLoading">
                    {{ summary.household.month }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>

              <ap-grid class="ap-margin-remove-top">
                <div class="ap-width-expand">
                  <small class="ap-text-inverse"> THIS YEAR </small>
                </div>
                <div class="ap-text-right">
                  <h5
                    class="ap-text-inverse ap-margin-remove"
                    v-if="!summaryLoading"
                  >
                    {{ summary.household.year }}
                  </h5>
                  <ap-loader v-else :size="'small'" :color="'primary'" />
                </div>
              </ap-grid>
            </div>
          </div>
        </router-link>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l" v-show="show">
        <div class="card radius-10 bg-gradient" :class="apCardBackground">
          <div class="card-body">
            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> DOCUMENTS </small>
                <h4
                  class="ap-margin-remove ap-text-inverse"
                  v-if="!summaryLoading"
                >
                  {{ summary.documents.total }}
                </h4>
                <div class="ap-margin-small-top" v-else>
                  <ap-loader :size="'small'" :color="'primary'" />
                </div>
              </div>
              <div class="ap-text-right">
                <div class="ap-text-inverse ms-auto font-35">
                  <i class="bx bx-file"></i>
                </div>
              </div>
            </ap-grid>

            <hr class="ap-text-inverse" />

            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS MONTH </small>
              </div>
              <div class="ap-text-right">
                <h5 class="ap-text-inverse" v-if="!summaryLoading">
                  {{ summary.documents.month }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>

            <ap-grid class="ap-margin-remove-top">
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS YEAR </small>
              </div>
              <div class="ap-text-right">
                <h5
                  class="ap-text-inverse ap-margin-remove"
                  v-if="!summaryLoading"
                >
                  {{ summary.documents.year }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>
          </div>
        </div>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l" v-show="show">
        <div class="card radius-10 bg-gradient" :class="apCardBackground">
          <div class="card-body">
            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> SMS </small>
                <h4
                  class="ap-margin-remove ap-text-inverse"
                  v-if="!summaryLoading"
                >
                  {{ summary.messages.total }}
                </h4>
                <div class="ap-margin-small-top" v-else>
                  <ap-loader :size="'small'" :color="'primary'" />
                </div>
              </div>
              <div class="ap-text-right">
                <div class="ap-text-inverse ms-auto font-35">
                  <i class="lni lni-envelope"></i>
                </div>
              </div>
            </ap-grid>

            <hr class="ap-text-inverse" />

            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS MONTH </small>
              </div>
              <div class="ap-text-right">
                <h5 class="ap-text-inverse" v-if="!summaryLoading">
                  {{ summary.messages.month }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>

            <ap-grid class="ap-margin-remove-top">
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS YEAR </small>
              </div>
              <div class="ap-text-right">
                <h5
                  class="ap-text-inverse ap-margin-remove"
                  v-if="!summaryLoading"
                >
                  {{ summary.messages.year }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>
          </div>
        </div>
      </div>

      <div class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l" v-show="show">
        <div class="card radius-10 bg-gradient" :class="apCardBackground">
          <div class="card-body">
            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> CALLS (minutes) </small>
                <h4
                  class="ap-margin-remove ap-text-inverse"
                  v-if="!summaryLoading"
                >
                  {{ callsTotal }}
                </h4>
                <div class="ap-margin-small-top" v-else>
                  <ap-loader :size="'small'" :color="'primary'" />
                </div>
              </div>
              <div class="ap-text-right">
                <div class="ap-text-inverse ms-auto font-35">
                  <i class="lni lni-phone"></i>
                </div>
              </div>
            </ap-grid>

            <hr class="ap-text-inverse" />

            <ap-grid>
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS MONTH </small>
              </div>
              <div class="ap-text-right">
                <h5 class="ap-text-inverse" v-if="!summaryLoading">
                  {{ callsMonth }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>

            <ap-grid class="ap-margin-remove-top">
              <div class="ap-width-expand">
                <small class="ap-text-inverse"> THIS YEAR </small>
              </div>
              <div class="ap-text-right">
                <h5
                  class="ap-text-inverse ap-margin-remove"
                  v-if="!summaryLoading"
                >
                  {{ callsYear }}
                </h5>
                <ap-loader v-else :size="'small'" :color="'primary'" />
              </div>
            </ap-grid>
          </div>
        </div>
      </div> -->


        <div v-for="(item, key) in summary" :key="key" class="ap-width-1-1@s ap-width-1-3@m ap-width-1-3@l">
            <a
              @click="toggleModal(key, true)"
              class="ap-link-reset ap-point"
              >
                  <Cards 
                      :cardBackground="apCardBackground"
                      :title="title(key)"
                      :icon="icon(key)"
                      :month="month(key, item.month)"
                      :total="total(key, item.total)"
                      :year="year(key, item.year)"
                      :getSummaryLoading ="summaryLoading"
                  /> 
            </a>
        </div>  

    </ap-grid>

    <div class="ap-margin-top ap-margin-bottom">
      <ap-grid :gutter="'small'">
        <div class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l">
          <a
            class="ap-link-reset ap-point ap-text-primary"
            @click="show = !show"
          >
            <i class="lni lni-angle-double-down ap-margin-small-right"></i>
            {{ show ? "HIDE" : "SHOW" }} MORE
          </a>
        </div>
        <div
          class="ap-width-1-1@s ap-width-1-2@m ap-width-1-2@l ap-text-right@m"
        >
          <ap-button
            :size="'small'"
            :color="apButtonBackground"
            :cardBackground="apCardBackground"
            :rounded="true"
            @click="toggleModal('download', true)"
          >
            <i class="bx bx-download"></i> DOWNLOAD
          </ap-button>
        </div>

         
      </ap-grid>

     
    </div>
    
    <download-modal />

    <beneficiaries-modal />

    <officers-modal />

    <voter-types-modal />

    <networks-modal />

    <officers-networks-modal />

    <verified-voters-modal />

    <cross-matched-voters-modal />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Http from "@/services";

import { Dater } from "@/utils";

import DownloadModal from "./components/modals/download";
import BeneficiariesModal from "./components/modals/beneficiaries";
import OfficersModal from "./components/modals/officers";
import VoterTypesModal from "./components/modals/voter-types";
import NetworksModal from "./components/modals/networks";
import OfficersNetworksModal from "./components/modals/officers-networks";
import VerifiedVotersModal from "./components/modals/verified-voters";
import CrossMatchedVotersModal from "./components/modals/cross-matched-voters";
import Cards from "./cards/cards.vue"

export default {
  components: {
    DownloadModal,
    VerifiedVotersModal,
    CrossMatchedVotersModal,
    BeneficiariesModal,
    OfficersModal,
    VoterTypesModal,
    NetworksModal,
    OfficersNetworksModal,
    Cards
  },

  data() {

    return {
      downloadModal: false,
      beneficiariesModal: false,
      officersModal: false,
      voterTypesModal: false,
      networksModal: false,
      officersNetworksModal: false,
      verifiedVotersModal: false,
      crossMatchedVotersModal: false,

      summaryLoading: false,
      summary: {

        issuedSdnIds: {
          total: 0,
          month: 0,
          year: 0
        },
        beneficiaries: {
          total: 0,
          month: 0,
          year: 0,
        },
        patients: {
          total: 0,
          month: 0,
          year: 0,
        },
        incentives: {
          total: 0,
          month: 0,
          year: 0,
        },
        household: {
          total: 0,
          month: 0,
          year: 0,
        },
        assistances: {
          total: 0,
          month: 0,
          year: 0,
        },
        documents: {
          total: 0,
          month: 0,
          year: 0,
        },
        officers: {
          total: 0,
          month: 0,
          year: 0,
        },
        voterTypes: {
          total: 0,
          others: 0,
          command: 0,
          sure: 0,
          swing: 0,
          block: 0,
          year: {
            total: 0,
            others: 0,
            command: 0,
            sure: 0,
            swing: 0,
            block: 0,
          },
          month: {
            total: 0,
            others: 0,
            command: 0,
            sure: 0,
            swing: 0,
            block: 0,
          },
          date: {
            total: 0,
            others: 0,
            command: 0,
            sure: 0,
            swing: 0,
            block: 0,
          },
        },
        networksTotal: {
          total: 0,
          month: 0,
          year: 0,
        },
        messages: {
          total: 0,
          month: 0,
          year: 0,
        },
        calls: {
          total: 0,
          month: 0,
          year: 0,
        },
      },

      show: false,
    };
  },

  created() {
    this.loadSummary();
  },

  computed: {
    ...mapGetters({
      accessUser: "auth/accessUser",
    }),

    company() {
      return this.accessUser.company;
    },

    callsTotal() {
      return parseInt(this.summary.calls.total);
    },

    callsMonth() {
      return parseInt(this.summary.calls.month);
    },

    callsYear() {
      return parseInt(this.summary.calls.year);
    },

    apCardBackground() {
      if (this.company.province_id == "0314") return "ap-card-orange";

      return "bg-primary";
    },

    apButtonBackground() {
      if (this.company.province_id == "0314") return "customPink";

      return "primary";
    },

    appBeneficiaryName() {
      return process.env.APP_BENEFICIARY_PLURAL_NAME;
    },
  },

  methods: {

    total(key, value) {

      if(key !== 'voterTypes') return parseInt(value);

      else if(key === 'calls') return parseInt(this.summaryData.calls.total);

      let total = parseInt(this.summary.voterTypes.command);
      total += parseInt(this.summary.voterTypes.sure);
      total += parseInt(this.summary.voterTypes.swing);
      total += parseInt(this.summary.voterTypes.block);

      return total;
    },
    year(key, value) {

      if(key !== 'voterTypes') return parseInt(value);
          

      else if(key === 'calls') return parseInt(this.summary.calls.year);

      let total = parseInt(this.summary.voterTypes.year.command);
      total += parseInt(this.summary.voterTypes.year.sure);
      total += parseInt(this.summary.voterTypes.year.swing);
      total += parseInt(this.summary.voterTypes.year.block);

      return total;
    },

    month(key, value) {

      if(key !== 'voterTypes') return parseInt(value);

      else if(key === 'calls') return parseInt(this.summaryData.calls.month);

      let total = parseInt(this.summary.voterTypes.month.command);
      total += parseInt(this.summary.voterTypes.month.sure);
      total += parseInt(this.summary.voterTypes.month.swing);
      total += parseInt(this.summary.voterTypes.month.block);

      return total;
    },

    date(key, value) {

      if(key !== 'voterTypes') return parseInt(value);

      let total = parseInt(this.summary.voterTypes.date.command);
      total += parseInt(this.summary.voterTypes.date.sure);
      total += parseInt(this.summary.voterTypes.date.swing);
      total += parseInt(this.summary.voterTypes.date.block);

      return total;
    },
    title(key) {

      let split = key.split(/(?=[A-Z])/);

      return split.join(" ").toUpperCase();
    },

    icon(key){

      switch (this.title(key)) {

          case 'BENEFICIARIES':
            return 'bx bx-user-circle';

          case 'OFFICERS':
            return 'bx bx-user';

          case 'VERIFIED VOTERS':
            return 'bx bxs-badge-check';
            
          case 'CROSS MATCHED VOTERS':
            return 'bx bx-flag';

          case 'ISSUED SDN IDS':
            return 'bx bx-id-card';

          case 'INCENTIVES':
            return 'bx bx-award';

          case 'ASSISTANCES':
            return 'bx bx-user-check';

          case 'VOTER TYPES':
            return 'bx bx-user';

          case 'PATIENTS':
            return 'bx bx-user-pin';

          case 'HOUSEHOLD':
            return 'bx bx-user';

          case 'DOCUMENTS':
            return 'bx bx-file';

          case 'MESSAGES':
            return 'lni lni-envelope';

          case 'CALLS':
            return 'lni lni-phone';

          case 'NETWORKS':
            return 'lni lni-network';

          default:
              return '';
      }

    },

    voterTypesTotal() {
      let total = parseInt(this.summary.voterTypes.command);
      total += parseInt(this.summary.voterTypes.sure);
      total += parseInt(this.summary.voterTypes.swing);
      total += parseInt(this.summary.voterTypes.block);

      return total;
    },

    voterTypesYear() {
      let total = parseInt(this.summary.voterTypes.year.command);
      total += parseInt(this.summary.voterTypes.year.sure);
      total += parseInt(this.summary.voterTypes.year.swing);
      total += parseInt(this.summary.voterTypes.year.block);

      return total;
    },

    voterTypesMonth() {
      let total = parseInt(this.summary.voterTypes.month.command);
      total += parseInt(this.summary.voterTypes.month.sure);
      total += parseInt(this.summary.voterTypes.month.swing);
      total += parseInt(this.summary.voterTypes.month.block);

      return total;
    },

    voterTypesDate() {
      let total = parseInt(this.summary.voterTypes.date.command);
      total += parseInt(this.summary.voterTypes.date.sure);
      total += parseInt(this.summary.voterTypes.date.swing);
      total += parseInt(this.summary.voterTypes.date.block);

      return total;
    },


    async loadSummary() {
      let currentDate = Dater.rawToday();

      this.summaryLoading = true;

      const response = await Http.get(
        `/my-company/summary/total?date=${currentDate}`
      );

      this.summaryLoading = false;

      if (response.status == 200) {
        this.summary = response.data;
      }
    },

    toggleModal(name, bool) {
      // console.log(name);
      this[`${name}Modal`] = bool;
    },
  },
};
</script>
