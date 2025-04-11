<template>
  <div class="ap-width-xxlarge ap-margin-auto ap-margin-top">
    <div class="card card-body ap-padding">
      <form class="ap-form-stacked">
        <fieldset class="ap-fieldset">
          <!-- Header -->
          <div class="ap-grid ap-grid-small">
            <div class="ap-width-expand@m">
              <p class="ap-text-bold ap-margin-remove-bottom">AI Answer</p>
              <div>
                <small class="ap-text-italic">
                  Here's what I found based on your question.
                </small>
              </div>
            </div>
          </div>

          <!-- If no response yet -->
          <div v-if="!response || response === ''" class="ap-margin-top">
            <div class="ap-padding ap-background-muted" style="border-radius: 10px; font-size: 1rem; line-height: 1.6;">
              Waiting for your question...
            </div>
          </div>

          <!-- If response is available -->
          <div v-else class="ap-margin-top ap-grid">
            <div class="ap-width-expand">
              <div
                class="ap-padding ap-background-muted"
                style="border-radius: 10px; font-size: 1rem; line-height: 1.6;"
              >
                {{ response }}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    response: {
      type: String,
      default: '',
    },
  },
};

</script>
