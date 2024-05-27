import "./App.css";
import AppRoutes from "./components/AppRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <p>Find this application layout in client/src/App.jsx</p>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;