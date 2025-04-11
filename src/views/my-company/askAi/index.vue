<template>
  <div>
    <AskComponent @ask="askAi" />
    <AnswerComponent :response="aiResponse" />
  </div>
</template>

<script>
import AskComponent from './components/ask.component.vue';
import AnswerComponent from './components/answer.component.vue';

import axios from 'axios';

export default {
  components: {
    AskComponent,
    AnswerComponent,
  },
  data() {
    return {
      aiResponse: '',
    };
  },
  methods: {
    async askAi(question) {
      this.aiResponse = 'Thinking...';

      try {
        const res = await axios.post('https://membership-api.kapitan.ph/api/my-company/dashboard/ask-openai', {
          ask: question,
        });

        this.aiResponse = res.data.response || 'I couldn’t find an answer, sorry.';
      } catch (error) {
        console.error(error);
        this.aiResponse = 'Something went wrong. Please try again.';
      }
    },
  },
};

</script>
