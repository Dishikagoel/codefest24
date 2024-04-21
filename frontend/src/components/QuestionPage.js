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
  backgroundColor: '#fff', // Set button background color to white
  color: '#000', // Set button text color to black
  borderRadius: 16, // Increased roundness for buttons
  padding: '10px 20px', // Increased button padding for readability
  '&:hover': { // Add hover effect (lighter background and slightly darker text)
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
});

// Define question structure with clear labels and combined options
const initialOptions = [
  ['Learning Environment/School Experience', ['Friends/family', 'Alone', 'With strangers', 'Online', 'Other']],
  ['Learning Style', ['Visual', 'Auditory', 'Kinesthetic', 'Reading/writing']],
  ['Interests', ['Math', 'Science', 'History', 'English', 'Art', 'Sports', 'Music', 'Reading', 'Gaming', 'Cooking', 'Other (please specify)']],
];

const QuestionPage = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Use state to track current question index

  const handleOptionClick = (option) => {
    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);

    if (currentQuestion === initialOptions.length - 1) {
      // Navigate to Agent.js on last question (replace with your logic)
      navigate('/agent');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goBackToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOptions(selectedOptions.slice(0, -1));
    }
  };

  return (
    <>
      <style jsx global> {/* Apply global styles */}
        {`
          body {
            background-color: #f5f5f5; /* Light background for better contrast */
            color: #333; /* Darker text for readability */
            font-family: sans-serif;
            margin: 0; /* Remove default margin for better layout control */
            padding: 20px; /* Add padding for a clean look */
          }

          /* Add keyboard focus styles for better user experience */
          button:focus,
          [role="button"]:focus {
            outline: 2px solid #333; /* Visible focus outline */
          }
        `}
      </style>

      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {initialOptions[currentQuestion][0]} {/* Emphasize question with clear label */}
        </Typography>
        <Grid container spacing={2} direction="column">
          {initialOptions[currentQuestion][1].map((option, index) => (
            <Grid item key={index}>
              <OptionButton variant="outlined" fullWidth startIcon={<FaceIcon />} onClick={() => handleOptionClick(option)}>
                {option}
              </OptionButton>
            </Grid>
          ))}
        </Grid>
        {selectedOptions.length > 0 && (
          <Button variant="outlined" fullWidth onClick={goBackToPreviousQuestion}>
            Back
          </Button>
        )}
      </Container>
    </>
  );
};

export default QuestionPage;



