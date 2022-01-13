import React from "react";
import { BrowserRouter as Router, Switch, Route, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import "./Login.css";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.cookie = new Cookies();
      }
    state = {
        loginInfo:{
            email_mobile: "1292037210",
            password: "ShahriarT65",
        },
        loginMsg:{
            status:null,
            msg:''
        }
    };
    redirect = (to) => {
        const { navigation } = this.props;
        return navigation(to);
    };
    changeInputHandler=(event,inpEl)=>{
        const loginInfo = {...this.state.loginInfo}
        loginInfo[inpEl] = event.target.value;
        this.setState({loginInfo:loginInfo})
    }
    loginHandler=()=>{
        axios.post("https://se.armanbrokerage.ir/api/v1/user/login",this.state.loginInfo).then((res) => {
            this.cookie.set("TOKEN", res.data.data.token_detail.token);
            let login = {...this.state.loginInfo}
            login.status = false;
            login.msg = '';
            this.setState({loginMsg:login})
            setTimeout(() => {
                this.redirect('/awards')
            }, 1500);
        }).catch(er=>{
            let login = {...this.state.loginInfo}
            login.msg = er.response.data.meta.message;
            login.status = true;
            this.setState({loginMsg:login})
        })
    }
    render() {
        let msg = '';
        if(this.state.loginMsg.status){
            msg = <Alert severity="error" sx={{ my: "1rem" }}>{this.state.loginMsg.msg}</Alert>
        }
        return (
            <div className="login">
                <h3>login component</h3>
                <TextField onChange={(event)=>this.changeInputHandler(event,'email_mobile')} id="standard-basic" label="username" variant="standard" />
                <TextField onChange={(event)=>this.changeInputHandler(event,'password')} sx={{ mt: "1rem" }} id="standard-basic" label="password" variant="standard" />
                {msg}
                <Button onClick={this.loginHandler} sx={{ mt: "3rem" }} variant="contained" color="success">
                    login
                </Button>
            </div>
        );
    }
}

export default function (props) {
    const navigation = useNavigate();

    return (
        <div>
            <Login navigation={navigation} />
        </div>
    );
}

//export default Login;
