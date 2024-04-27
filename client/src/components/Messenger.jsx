import React, { useState } from 'react';
import { BsChatDotsFill } from 'react-icons/bs';
import ChatBox from './ChatBox'; // Assuming you have a ChatBox component

const Messenger = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <div style={messengerStyle}>
      {/* Messenger icon */}
      <div onClick={toggleChatBox} style={iconStyle}>
        <BsChatDotsFill size={50} style={{ color: 'white' }} />
      </div>
      {/* Chat box */}
      {showChatBox && <ChatBox />}
    </div>
  );
};

const messengerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '30px',
  zIndex: '1000',
};

const iconStyle = {
  cursor: 'pointer',
  background: 'linear-gradient(45deg, #00FFFF, #0000FF)',
  borderRadius: '50%',
  padding: '10px',
};

export default Messenger;
