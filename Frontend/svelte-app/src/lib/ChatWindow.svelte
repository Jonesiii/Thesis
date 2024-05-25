<script>
  export let sendRequest;

  let chatHistory = [];
  let message = '';

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const startTime = performance.now();
    const response = await sendRequest(message);
    const endTime = performance.now(); 
    const responseTime = endTime - startTime; 

    console.log('Time:', responseTime, '\nRes:', response);
    chatHistory = [
      ...chatHistory,
      { sender: 'You', message },
      { sender: 'Bot', message: response }
    ];
    message = '';
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
</script>

<div class="chat-window-container">
  <div class="chat-message-container">
    {#each chatHistory as chat, index}
      <div key={index} class:bot-message={chat.sender === 'Bot'} class:user-message={chat.sender === 'You'}>
        <strong>{chat.sender}: </strong>{chat.message}
      </div>
    {/each}
  </div>
  <div class="message-input-container">
    <textarea
      class="message-input"
      placeholder="Type your message here..."
      bind:value={message}
      on:input={(e) => message = e.target.value}
      on:keypress={handleKeyPress}
    />
    <button class="send-button" on:click={handleSendMessage}>Send</button>
  </div>
</div>

<style>

/* Style the chat window container */
.chat-window-container {
  display: flex;
  flex-direction: column;
  height: 400px; /* Set a fixed height for the chat window */
  width: 800px;
  border: 2px solid #ccc; /* Add border to the chat box */
  border-radius: 10px; /* Add border radius */
  padding: 10px; /* Add padding */
}

/* Style the chat message container */
.chat-message-container {
  flex: 1; /* Grow to fill available space */
  overflow-y: auto; /* Enable vertical scrolling */
}

/* Style the user message */
.user-message {
  align-self: flex-end; /* Align user messages to the right */
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  padding: 10px;
}

/* Style the bot message */
.bot-message {
  align-self: flex-start; /* Align bot messages to the left */
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
}

/* Style the message input and send button */
.message-input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.message-input {
  flex: 1; /* Take up remaining space */
  height: 40px; /* Set the height of the message input */
  resize: none; /* Prevent resizing */
}

.send-button {
  margin-left: 10px; /* Add space between input and button */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>

