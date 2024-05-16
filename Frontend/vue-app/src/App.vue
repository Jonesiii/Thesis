<template>
  <div class="app">
    <h3 class="title">Vue AI ChatBot</h3>
    <ChatWindow :sendRequest="sendRequest" />
  </div>
</template>

<script>
import ChatWindow from './components/ChatWindow.vue';

export default {
  components: {
    ChatWindow
  },
  methods: {
    async sendRequest(message) {
      try {
        const response = await fetch("http://localhost:5000/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        return 'Failed to generate response!';
      }
    }
  }
};
</script>
