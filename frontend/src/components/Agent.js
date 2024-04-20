import React, { useState, useRef, useEffect } from 'react';
import ChatbotPopover from './ChatbotPopover';

function Agent() {
  const [messageHistory, setMessageHistory] = useState([
    'Hello, how can I help you today?',
    // ... more initial messages if needed
  ]);
  // We use useRef to create a reference to the avatar element which the popover will anchor to
  const avatarRef = useRef(null);

  // Assume popover is always open
  const open = true;

  return (
    <div style={{ position: 'fixed', right: 0, bottom: 0, padding: 16 }}>
      {/* The popover is always visible because `open` is set to `true` */}
      <ChatbotPopover anchorEl={avatarRef.current} open={open} messageHistory={messageHistory} />
      
      {/* Reference to avatar element */}
      <div
        ref={avatarRef}
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'black',
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}
      >
        <img
          src="https://via.placeholder.com/50"
          alt="Chatbot avatar"
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </div>
    </div>
  );
}

export default Agent;
