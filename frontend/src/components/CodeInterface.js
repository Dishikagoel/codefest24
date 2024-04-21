import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Agent from './Agent'
import { boilerCodes } from '../boilerCodes';
import { Container, Button, Snackbar, Alert, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh !important',
        minWidth: '70% !important',
        width: '70% !important',
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
    const [alertOpen, setAlertOpen] = useState(false);  // State to control alert visibility
    const [alertMessage, setAlertMessage] = useState("");  // Message to show in the alert
    const classes = useStyles();
    const [question, setQuestion] = useState("Question) Make a hello world statement?");
    const [timerStart, setTimerStart] = useState(null);
    const [timerEnd, setTimerEnd] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };
    const [language, setLanguage] = useState({
        label: "Python",
        value: "python",
        id: 71,
        name: "Python",
    });
    async function sendToAPI(code) {
        setTimerEnd(Date.now());
        const elapsedTime = (Date.now() - timerStart) / 1000; // Convert ms to seconds
        setElapsedTime(elapsedTime); // Update state with elapsed time
        console.log(`Elapsed time: ${elapsedTime} seconds`);
        setTimerStart(Date.now());
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
            if(data.response === "Success"){
                    setSeverity("success");
                    setAlertMessage("Success compiling code!");
                    setAlertOpen(true);
            } else {
                // MUI Alert for error
                setSeverity("error");
                setAlertMessage("Error compiling code!" + data.response + " Please try again!");
                setAlertOpen(true);
            }

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
            setMessages([...messages, data.feedback]);

        } catch (error) {
            console.error("Could not send POST request:", error);
        }
    }
    const [severity, setSeverity] = useState("success");  // Severity of the alert
    const [code, setCode] = useState(boilerCodes(language.id));
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setCode(boilerCodes(language.id));
    }, [language]);
    useEffect(() => {
        setTimerStart(Date.now());
        setElapsedTime(null); // Reset elapsed time when question changes
    }, [question]); 

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
                    <Typography variant="h6" style={{ color: 'white', marginRight: 20 }}>
                        {elapsedTime && `Time Taken: ${elapsedTime.toFixed(2)} seconds`}
                    </Typography>
                    <Button variant="contained" onClick={() => { sendToAPI(code); }}>Submit</Button>
                </Container>
            </Container>
            <Agent messages={messages} setMessages={setMessages}/>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CodeInterface