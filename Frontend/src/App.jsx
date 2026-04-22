import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "../Components/HomePage";
import FeaturesSection from "../Components/sidebar/features/FeaturesSection";
import MainLayout from "../Design/MainLayout";
import Profile from "../Components/sidebar/profile/Profile";

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/features" element={<FeaturesSection />} />
                    <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;