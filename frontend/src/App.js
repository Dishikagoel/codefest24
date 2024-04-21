import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionPage from './components/QuestionPage';
import CodeInterface from './components/CodeInterface';
import Dashboard from './Dashboard';

function App() {
    
    return (
        <Router>
            <div>
                <Routes>
                    {/* You can define more routes as needed */}
                    {/* <Route path="/other-path" element={<OtherComponent />} /> */}
                    <Route path="/agent" element={<CodeInterface/>} />
                    {/* Redirect to the question page by default */}
                    <Route path="/" element={<QuestionPage />} />
                    <Route path="/question" element={<QuestionPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
