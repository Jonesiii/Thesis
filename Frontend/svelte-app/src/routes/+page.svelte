<script>
  import { onMount } from 'svelte';
  import ChatWindow from '../lib/ChatWindow.svelte';

  let sendRequest;

  onMount(async () => {
    sendRequest = async (message) => {
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
    };
  });
</script>

<div class="App">
  <h3 class="title">Svelte AI ChatBot</h3>
  {#if sendRequest}
    <ChatWindow {sendRequest} />
  {/if}
</div>

<style>
  
/* Set the height of the body and make it a flex container */
:global(body) {
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

</style>
