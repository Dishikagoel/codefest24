import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  return (
      <Router>
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p className="h1 text">
          Hello, world!
        </p>
        <Link to="/"> Begin! </Link>
        {/*<Routes>*/}
        {/*  <Route path"/" element={<App />} />*/}
          {/*<Route path="/index" element={<}*/}
        {/*</Routes>*/}
      </header>
    </div>
      </Router>
  );
}

export default App;
