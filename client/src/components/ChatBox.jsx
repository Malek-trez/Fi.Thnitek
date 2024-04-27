import React, { useState } from 'react';

const ChatBox = () => {
  const [reply, setReply] = useState('');

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to handle the reply
    console.log('Reply submitted:', reply);
    // Clear the reply input field after submission
    setReply('');
  };

  return (
    <div style={chatBoxStyle}>
    
      <div style={messageStyle}>Hi, how can I help you?</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your reply..."
          value={reply}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
};

const chatBoxStyle = {
  position: 'fixed',
  bottom: '70px',
  right: '20px',
  width: '300px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '10px',
};

const headerStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const messageStyle = {
  padding: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '8px',
};

const buttonStyle = {
  width: '100%',
  padding: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ChatBox;
