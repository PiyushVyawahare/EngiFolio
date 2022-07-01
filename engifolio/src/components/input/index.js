import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import style from "./style.module.css"

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    color: 'white',
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: 'white',
      borderColor: 'white',
    },
    '&:hover fieldset': {
      color: 'white',
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      color: 'white',
      borderColor: 'white',
    },
  },
});

export default function Input(props) {
  return (     
      <CssTextField 
        label={props.label} 
        id="custom-css-outlined-input" 
        type={props.type}
        required = {props.required}
        onChange = {props.onChange}
        value = {props.value}
        size = {props.size}
        focused = {props.focused}
        fullWidth = {props.fullWidth}
        InputLabelProps={
           {
             className : style.lablefield 
           }
        }
        InputProps={
          {
            className : style.inputClass 
          }
        }
      />
  );
}


Input.defaultProps = {
  type: "Text",
  required: false,
  focused: false,
  label: "Input Field",
  size: "small",
  fullWidth: false
}