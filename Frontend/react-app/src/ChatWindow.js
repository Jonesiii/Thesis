import { useState } from 'react';
import "./App.css";

export const ChatWindow = ({ sendRequest }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const startTime = performance.now();
    const response = await sendRequest(message);
    const endTime = performance.now(); 
    const responseTime = endTime - startTime; 

    console.log('Time:', responseTime, '\nRes:', response);
    setChatHistory(prevHistory => [
      ...prevHistory,
      { sender: 'You', message },
      { sender: 'Bot', message: response }
    ]);
    setMessage('');
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-message-container">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender === 'You' ? 'user-message' : 'bot-message'}>
            <strong>{chat.sender}: </strong>{chat.message}
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <textarea
          className="message-input"
          placeholder="Type your message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );  
}