import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FaceIcon from '@mui/icons-material/Face';
import { useNavigate } from "react-router-dom";

const OptionButton = styled(Button)({
    height: 50,
    margin: '8px 0',
    justifyContent: 'flex-start',
});

// make some question understand how the child learns
const initialOptions = [['How do you like classrooms?', ['Friends/family', 'Alone', 'With strangers', 'Online', 'Other']], ['How do you like to learn?', ['Visual', 'Auditory', 'Kinesthetic', 'Reading/writing']], ['What is your favorite subject?', ['Math', 'Science', 'History', 'English', 'Art', 'Other']], ['What is your favorite hobby?', ['Sports', 'Music', 'Reading', 'Gaming', 'Cooking', 'Other']], 'How do you feel about school?', ['Love it', 'Hate it', 'It\'s okay', 'I don\'t go to school']];

const QuestionPage = () => {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(0);

    const handleOptionClick = (option) => {
        if (options == initialOptions.length-1) {
            // navigate to /about
            navigate("/agent");
        }
        const newSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(newSelectedOptions);
        setOptions(options+1);
    };

    const goBackToPreviousQuestion = () => {
        setOptions(options-1);
        setSelectedOptions(selectedOptions.slice(0, -1));
    };


    return (
        <Container style={{backgroundColor: 'rgb(18 20 45)', width: '100% !important', height: '100vh !important'}} maxWidth={false}>
            
            <Typography variant="h4" gutterBottom>
                {initialOptions[options][0]}
            </Typography>
            {selectedOptions.length > 0 && (
                <Button variant="outlined" fullWidth onClick={goBackToPreviousQuestion}>
                    Back
                </Button>
            )}
            {
            <Grid container spacing={2} direction="column">
                {initialOptions[options][1].map((option, index) => (
                    <Grid item key={index}>
                        <OptionButton variant="outlined" fullWidth startIcon={<FaceIcon />} onClick={() => handleOptionClick(option)}>
                            {option}
                        </OptionButton>
                    </Grid>
                ))}
            </Grid>}
        </Container>
    );
};

export default QuestionPage;
