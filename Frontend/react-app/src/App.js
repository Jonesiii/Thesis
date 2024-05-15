import { ChatWindow } from './ChatWindow.js'

function App() {

  const sendRequest = async (message) => {
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

  return (
    <div className="App">
      <h3 className="title">React AI ChatBot</h3>
      <ChatWindow sendRequest={sendRequest} />
    </div>
  );
}

export default App;
