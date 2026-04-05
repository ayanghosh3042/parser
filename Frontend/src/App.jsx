import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "../Components/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
}

export default App;
