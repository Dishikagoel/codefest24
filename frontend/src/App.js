import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionPage from './components/QuestionPage';


function App() {
    return (
        <Router>
            <div>
                <Routes>

                    {/* You can define more routes as needed */}
                    {/* <Route path="/other-path" element={<OtherComponent />} /> */}
                    {/* <Route path="/agent" element={<Agent />} /> */}

                    {/* Redirect to the question page by default */}
                    <Route path="/question" element={<QuestionPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
