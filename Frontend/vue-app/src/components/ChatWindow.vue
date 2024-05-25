<template>
  <div class="chat-window-container">
    <div class="chat-message-container">
      <div v-for="(chat, index) in chatHistory" :key="index" :class="{ 'user-message': chat.sender === 'You', 'bot-message': chat.sender === 'Bot' }">
        <strong>{{ chat.sender }}: </strong>{{ chat.message }}
      </div>
    </div>

    <div class="message-input-container">
      <textarea
        class="message-input"
        placeholder="Type your message here..."
        v-model="message"
        @keypress.enter="handleKeyPress"
      ></textarea>
      <button class="send-button" @click="handleSendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sendRequest: Function
  },
  data() {
    return {
      chatHistory: [],
      message: ''
    };
  },
  methods: {
    async handleSendMessage() {
      if (this.message.trim() === '') return;
      const startTime = performance.now();
      const response = await this.sendRequest(this.message);
      const endTime = performance.now(); 
      const responseTime = endTime - startTime; 

      console.log('Time:', responseTime, '\nRes:', response);
      this.chatHistory.push({ sender: 'You', message: this.message });
      this.chatHistory.push({ sender: 'Bot', message: response });
      this.message = '';
    },
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.handleSendMessage();
      }
    }
  }
};
</script>