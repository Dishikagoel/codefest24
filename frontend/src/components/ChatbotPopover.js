import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledPopover = styled(Popover)({
  '& .MuiPopover-paper': {
    width: '300px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
});

const ChatbotPopover = ({ anchorEl, open, messageHistory }) => {

  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <List dense>
        {messageHistory.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
    </StyledPopover>
  );
};

export default ChatbotPopover;
