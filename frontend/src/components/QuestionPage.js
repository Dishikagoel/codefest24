import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FaceIcon from '@mui/icons-material/Face';

const OptionButton = styled(Button)({
    height: 50,
    margin: '8px 0',
    justifyContent: 'flex-start',
});

const initialOptions = {
    'How do you like classrooms?': {
        'Friends/family': {
            // next question should be 'How do you like to learn?'
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
        'Alone': {
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
        'With strangers': {
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
        'Online': {
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
        'Other': {
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
        "I don't like classrooms": {
            'How do you like to learn?': {
                'Visual': {},
                'Auditory': {},
                'Kinesthetic': {},
                'Reading/writing': {},
            }
        },
    }
};

const QuestionPage = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(initialOptions);

    const handleOptionClick = (option) => {
        if (!options[Object.keys(options)[0]][option]) return;
        const nextOptions = options[Object.keys(options)[0]][option];
        const newSelectedOptions = [...selectedOptions, [Object.keys(options)[0], option]];

        setSelectedOptions(newSelectedOptions);
        setOptions(nextOptions);
    };

    const goBackToPreviousQuestion = () => {
        if (selectedOptions.length === 0) return;

        // Remove the last selected option to go back
        const previousSelectedOptions = selectedOptions.slice(0, -1);
        setSelectedOptions(previousSelectedOptions);

        // Set the options to the parent of the last selected option
        let currentOptions = initialOptions;
        previousSelectedOptions.forEach((selected) => {
            currentOptions = currentOptions?.[selected[1]];
        });

        // Reconstruct the options for the last question
        const lastQuestion = previousSelectedOptions.length > 0
            ? previousSelectedOptions[previousSelectedOptions.length - 1][0]
            : Object.keys(initialOptions)[0];

        const reconstructedOptions = previousSelectedOptions.length > 0
            ? { [lastQuestion]: currentOptions }
            : initialOptions;

        setOptions(reconstructedOptions);
    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {Object.keys(options).length>0? Object.keys(options)[0]: 'No more questions'}
            </Typography>
            {selectedOptions.length > 0 && (
                <Button variant="outlined" fullWidth onClick={goBackToPreviousQuestion}>
                    Back
                </Button>
            )}
            <Grid container spacing={2} direction="column">
                {Object.keys(options[Object.keys(options)[0]]).map((option, index) => (
                    <Grid item key={index}>
                        <OptionButton variant="outlined" fullWidth startIcon={<FaceIcon />} onClick={() => handleOptionClick(option)}>
                            {option}
                        </OptionButton>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default QuestionPage;
