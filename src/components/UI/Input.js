import { TextField } from '@mui/material';
import React, { Component } from 'react';
import './Input.css'

class Input extends Component{
    render(){
        return (
            <div>
                <TextField className="input-element"
                 {...this.props.elementConfig}
                 value={this.props.elementValue}
                 onChange={this.props.change}
                 ></TextField>
            </div>
        );
    }
}

export default Input;