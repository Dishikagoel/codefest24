import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const StyledAgent = styled('div')({
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '30%',
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

function Agent({ messages, setMessages}) {
    const [inputMessage, setInputMessage] = useState('');
    const navigate = useNavigate();
    async function handleMessageSend() {
        try {
            const response = await fetch('http://127.0.0.1:3002/llm_chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
                },
                body: JSON.stringify({
                    "message": inputMessage,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages([...messages, `User: ${inputMessage}`, data.feedback]);

        } catch (error) {
            console.error("Could not send POST request:", error);
        }
        setInputMessage(''); // Clear the input after sending
    };
    return (
        <StyledAgent>
            <MessagesList>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg} />
                    </ListItem>
                ))}
            </MessagesList>
            {/* Text area to input a mssg to the llm */}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <TextField
                label="Type your message..."
                multiline
                maxRows={4}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                variant="outlined"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button onClick={handleMessageSend} variant="contained" style={{ marginBottom: '20px' }}>
                Send
            </Button>
            </div>
        </StyledAgent>
    );
}

export default Agent;
