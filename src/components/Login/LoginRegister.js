import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import Login from "./Login";
import Register from "../Register/Register";
const Menu = () => {
    return (
        <div>
            <NavLink to="/login" style={({ isActive }) => ({
              color: isActive ? '#fff' : '#545e6f',
            })}>
                <Button sx={{ mr: "1rem"}} variant="contained">login</Button>
            </NavLink>
            <NavLink to="/register" style={({ isActive }) => ({
              color: isActive ? '#fff' : '#545e6f'
            })}>
                <Button variant="contained">register</Button>
            </NavLink>
        </div>
    );
};

class LoginRegister extends React.Component{
    render(){
        return(
            <div>
                <Menu></Menu>
                <Routes>
                        {/* <Route path="/" element={<Login />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register/>} />
                    </Routes>
            </div>
        );
    }
}

export default LoginRegister;