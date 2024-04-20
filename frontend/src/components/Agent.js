import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const StyledAgent = styled('div')({
  position: 'fixed',
  right: 0,
  bottom: 0,
  width: '24%',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1000
});

const MessagesList = styled(List)({
  width: '100%',
  overflow: 'auto',
  flexGrow: 1,
  marginTop: 10,
});

const StyledAvatar = styled(Avatar)({
  position: 'absolute',
  bottom: 20,
  right: 20,
  backgroundColor: '#1976d2', // Example blue background
  cursor: 'pointer',
});

function Agent() {
  const [messages, setMessages] = useState([
    'Hello, how can I help you today?',
    'Feel free to ask any questions!',
  ]);

  return (
    <StyledAgent>
      <MessagesList>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </MessagesList>
      <StyledAvatar src="../../public/images/14360.png"></StyledAvatar>
    </StyledAgent>
  );
}

export default Agent;
