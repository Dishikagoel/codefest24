import React, { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Agent from './Agent'
import { boilerCodes } from '../boilerCodes';
import { Container,Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh !important',
        minWidth: '100% !important',
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
    const [language, setLanguage] = useState({
        label: "Python",
        value: "python",
        id: 71,
        name: "Python",
    });
    const [code, setCode] = useState(boilerCodes(language.id));
    useEffect(() => {
        setCode(boilerCodes(language.id));
    }, [language]);

    return (
        <>
        <Container className={classes.container} maxWidth={false}>
            <Container style={{width: '100% !important', position: 'fixed', top: 0, padding: 16, backgroundColor: 'rgb(16 26 43)', borderRadius: '10px', height: '20vh', margin: '0px !important', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} maxWidth={false}>
                <h2 style={{color: 'white'}}>Question) Make a hello world function</h2>
            </Container>
            <CodeEditor code={code} setCode={setCode} />
            {/* Make a footer where users can click on a submit material ui 3d button */}
            <Container style={{ position: 'fixed', bottom: 0, width: '100% !important', padding: 16, backgroundColor: 'rgb(16 26 43)', borderRadius: '10px', height: '20vh', margin: '0px !important', display: 'flex', justifyContent: 'center', alignItems: 'center' }} maxWidth={false}>
                {/* Create a material ui 3d button */}
                <Button variant="contained">Submit</Button>
            </Container>
        </Container>
        <Agent/>
        </>
    )
}

export default CodeInterface