import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Views/dashboard";
import Login from "./Views/login";
import Register from "./Views/register";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
