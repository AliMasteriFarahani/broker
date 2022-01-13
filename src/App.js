import React from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LoginRegister from "./components/Login/LoginRegister";
import Awards from "./components/Awards/Awards";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                  <div className="main">
                    <Routes>
                        <Route path="/" element={<LoginRegister />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/login-register" element={<LoginRegister />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/awards" element={<Awards/>} />
                    </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;
