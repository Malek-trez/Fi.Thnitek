import React, { useState } from 'react';
import { BsMessenger } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import ChatBox from './ChatBox'; // Assuming you have a ChatBox component

const Messenger = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const navigateTo=useNavigate();
  const toggleChatBox = () => {
      navigateTo('/chat')
    //setShowChatBox(!showChatBox);
  };

  return (
    <div style={messengerStyle}>
      {/* Messenger icon */}
      <div onClick={toggleChatBox} style={iconStyle}>
        <BsMessenger size={40} style={{ color: 'white' }} />
      </div>
      {/* Chat box */}
      {/*showChatBox && <ChatBox />*/}
    </div>
  );
};

const messengerStyle = {
  position: 'fixed',
  bottom: '40px',
  right: '20px',
  zIndex: '1000',
};

const iconStyle = {
  cursor: 'pointer',
  background: 'linear-gradient(45deg, #00FFFF, #0000FF)',
  borderRadius: '70%',
  padding: '7px',
};

export default Messenger;
