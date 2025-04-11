<!-- AskComponent.vue -->
<template>
  <div class="card card-body ap-padding">
    <form class="ap-form-stacked" @submit.prevent="submit">
      <fieldset class="ap-fieldset">
        <div class="ap-width-xxlarge ap-margin-auto">
          <div class="ap-grid ap-grid-small">
            <div class="ap-width-expand@m">
              <p class="ap-text-bold ap-margin-remove-bottom">Ask Me Anything</p>
              <div>
                <small class="ap-text-italic">Talk to the AI like you would a person.</small>
              </div>
            </div>
          </div>

          <div class="ap-margin-top ap-grid">
            <div class="ap-width-expand">
              <textarea
                v-model="question"
                rows="3"
                placeholder="Type your question..."
                class="ap-input-custom"
                style="width: 100%; resize: none; border-radius: 8px; padding: 1rem; font-size: 1rem;"
              ></textarea>
            </div>
            <div class="ap-text-right">
              <button
                class="ap-margin-small-top ap-button ap-button-primary ap-button-medium ap-button-full-rounded"
                type="submit"
              >
                <i class="lni lni-search"></i> Ask AI
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
    };
  },
  methods: {
    submit() {
      if (!this.question.trim()) return;
      this.$emit('ask', this.question);
      this.question = '';
    },
  },
};
</script>
