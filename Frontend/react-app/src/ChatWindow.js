import { useState } from 'react';

export const ChatWindow = ({ sendRequest }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    const response = await sendRequest(message);
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
    <div className="chat-window">
      <div className="message-container">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender === 'You' ? 'sent-message' : 'received-message'}>
            <strong>{chat.sender}: </strong>{chat.message}
          </div>
        ))}
      </div>
      <div className="input-container">
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
};

export default ChatWindow;