import React from "react";
import Cookies from "universal-cookie";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter as Router, Switch, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "../UI/Input";
import axios from "axios";
import "./Register.css";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.cookie = new Cookies();
    }
    redirect = (to) => {
        const { navigation } = this.props;
        return navigation(to);
    };
    state = {
        form: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "name",
                    variant: "standard",
                },
                value: "",
            },
            family: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "family",
                    variant: "standard",
                },
                value: "",
            },
            national_code: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "national code",
                    variant: "standard",
                },
                value: "",
            },
            mobile: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "mobile",
                    variant: "standard",
                },
                value: "",
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "email",
                    variant: "standard",
                },
                value: "",
            },
            flag: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "flag",
                    variant: "standard",
                },
                value: "IR",
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "password",
                    variant: "standard",
                },
                value: "",
            },
            confirmed: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "repassword",
                    variant: "standard",
                },
                value: "",
            },
            reagent_code: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "reagent code",
                    variant: "standard",
                },
                value: "",
            },
            branch: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    label: "branch",
                    variant: "standard",
                },
                value: "",
            },
        },
        info: {
            branch: "",
            confirmed: "",
            email: "",
            family: "",
            flag: "IR",
            mobile: "",
            name: "",
            national_code: "",
            password: "",
            reagent_code: "",
        },
        showR: false,
        successRegister:null
    };

    inputChangeHandler = (event, inputElement) => {
        const updatedForm = { ...this.state.form };
        const updatedElement = { ...updatedForm[inputElement] };
        updatedElement.value = event.target.value;
        updatedForm[inputElement] = updatedElement;
        this.setState({
            form: updatedForm,
        });
    };
    // get form data and send verification code :
    submitHandler = async (event) => {
        event.preventDefault();
        const formData = {};
        for (let item in this.state.form) {
            formData[item] = this.state.form[item].value;
        }
        this.setState({ showR: true });
        await this.setState({ info: formData });
        axios
            .post(
                "https://se.armanbrokerage.ir/api/v1/user/send/code",
                { mobile: this.state.info.mobile, flag: this.state.info.flag },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res, "res");
            });
    };
    // get value of code verification
    changeVerifyCodeHandler = (event) => {
        const verifyCode = event.target.value;
        console.log(verifyCode, "ddd");
        let formInfo = { ...this.state.info };
        formInfo.code = verifyCode;
        this.setState({
            info: formInfo,
        });
    };
    // send data to server
    sendData = (event) => {
        event.preventDefault();
        axios
            .post("https://se.armanbrokerage.ir/api/v1/user/register", this.state.info, {
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => {
                if (res.data.status === "Success") {
                    this.setState({successRegister:true})
                    this.cookie.set("TOKEN", res.data.data.token_detail.token);
                    setTimeout(() => {
                        this.redirect("/login");
                    }, 2000);
                } else {
                    this.setState({successRegister:false})
                }
            });
    };
    render() {
        const elementArray = [];
        for (let item in this.state.form) {
            elementArray.push({
                id: item,
                config: this.state.form[item],
            });
        }
        

        let msg = '';
        if(this.state.successRegister){
            msg =  <Alert sx={{ my: "1rem" }}>registrayion successfully done</Alert>
        }else if(this.state.successRegister === false){
            msg = <Alert severity="error" sx={{ my: "1rem" }}>Oops ! something is wrong</Alert>
        }

        return (
            <div className="register">
                
                {msg}
                {/* <button onClick={()=>this.redirect('/')}>go </button> */}
                <h3>register component</h3>
                {!this.state.showR ? (
                    <form onSubmit={this.submitHandler}>
                        {elementArray.map((item) => {
                            return <Input key={item.id} elementConfig={item.config.elementConfig} elementValue={item.config.value} change={(event) => this.inputChangeHandler(event, item.id)} />;
                        })}
                        <Button type="submit" sx={{ mt: "3rem" }} variant="contained" color="success">
                            register
                        </Button>
                    </form>
                ) : null}
                {this.state.showR ? (
                    <form>
                        <div>
                            <TextField onChange={this.changeVerifyCodeHandler} type="text" label="code" variant="standard" />
                        </div>
                        <Button onClick={this.sendData} type="submit" sx={{ mt: "3rem" }} variant="contained" color="success">
                            send data
                        </Button>
                    </form>
                ) : null}
            </div>
        );
    }
}
export default function (props) {
    const navigation = useNavigate();

    return (
        <div>
            <Register navigation={navigation} />
        </div>
    );
}
//export default Register;
