import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Agent from './Agent'
import { boilerCodes } from '../boilerCodes';
import { Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh !important',
        minWidth: '76% !important',
        width: '76% !important',
        flexDirection: 'column !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        padding: '0px !important',
        backgroundColor: '#2a2828',
        margin: '0px !important',
    },
}));


function CodeInterface() {
    const classes = useStyles();
    const [question, setQuestion] = useState("Question) Make a hello world function?");
    const [language, setLanguage] = useState({
        label: "Python",
        value: "python",
        id: 71,
        name: "Python",
    });
    async function sendToAPI(code) {
        // send code to API
        try {
            const response = await fetch('http://127.0.0.1:3002/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
                },
                body: JSON.stringify({
                    "code": code,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data); // Process the data
    
        } catch (error) {
            console.error("Could not send POST request:", error);
        }
    
        try {
            const response = await fetch('http://127.0.0.1:3002/llm_api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
                },
                body: JSON.stringify({
                    "question": question,
                    "answer": code,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Process the data
    
        } catch (error) {
            console.error("Could not send POST request:", error);
        }
    }
    
    const [code, setCode] = useState(boilerCodes(language.id));
    useEffect(() => {
        setCode(boilerCodes(language.id));
    }, [language]);

    return (
        <>
            <Container className={classes.container} maxWidth={false}>
                <Container style={{ width: '100% !important', position: 'fixed', top: 0, padding: 16, backgroundColor: 'rgb(16 26 43)', borderRadius: '10px', height: '20vh', margin: '0px !important', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} maxWidth={false}>
                    <h2 style={{ color: 'white' }}>{question}</h2>
                </Container>
                <CodeEditor code={code} setCode={setCode} />
                {/* Make a footer where users can click on a submit material ui 3d button */}
                <Container style={{ position: 'fixed', bottom: 0, width: '100% !important', padding: 16, backgroundColor: 'rgb(16 26 43)', borderRadius: '10px', height: '20vh', margin: '0px !important', display: 'flex', justifyContent: 'center', alignItems: 'center' }} maxWidth={false}>
                    {/* Create a material ui 3d button */}
                    <Button variant="contained" onClick={() => { sendToAPI(code); }}>Submit</Button>
                </Container>
            </Container>
            <Agent />
        </>
    )
}

export default CodeInterface