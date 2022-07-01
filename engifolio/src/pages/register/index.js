import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input'
import Button from '../../components/button'
import Card from '../../components/card'
import Heading from '../../components/heading'
import api from '../../api';
import Alert from '@mui/material/Alert';



export default function Register() {
  
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passData, setPassData] = useState("");
  const [cnfPassData, setCnfPassData] = useState("");
  const [successAlert, setSuccessAlert] = useState(0);
  const [errorAlert, setErrorAlert] = useState(0);
  let navigate = useNavigate();

  const errorMessages = {
    200: "Email sent Successfully! Please Verify!!",
    401: "Passwords are not matching, please check!!",
    409: "User with this email already exist, please login!!",
    500: "Internal serevr error!!",
    400: "Required* fields can't be empty!!"
  }

  function onNameEntered(event){
    setNameData(event.target.value);
  }

  function onEmailEntered(event){
    setEmailData(event.target.value);
  }

  function onPasswordEntered(event){
    setPassData(event.target.value);
  }

  function onConfirmPasswordEntered(event){
    setCnfPassData(event.target.value);
  }

  function closeSuccessAlert(){
    setSuccessAlert(false);
  }

  function closeErrorAlert(){
    setErrorAlert(false);
  }

  function onRegister(){
    api.post('/register', {
      name: nameData,
      email: emailData,
      password: passData,
      cpassword: cnfPassData
    })
    .then(function(res){
      if(res.status === 200){
        setSuccessAlert(200);
        setErrorAlert(0);
        setTimeout(function(){
          console.log(res);
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}});
        }, 3000)
      }
    }).catch(function(err){
      setErrorAlert(err.response.status);
      setSuccessAlert(0);
    })
  }
  
  return (
    <>
    {
      (successAlert)
      ?
      (<Alert severity="success" variant='filled' onClose={closeSuccessAlert}>{errorMessages[successAlert]}</Alert>)
      :
      <></>
    }
    {
      (errorAlert)
      ?
      (<Alert severity="error" variant='filled' onClose={closeErrorAlert}>{errorMessages[errorAlert]}</Alert>)
      :
      <></>
    }
    
    <Card>
    <Heading>Register</Heading>
    <br></br>
    <Input label="Enter Name" type="text" required onChange={onNameEntered} value={nameData} fullWidth></Input>
    <br></br>
    <br></br>
    <Input label="Enter Email" type="email" required onChange={onEmailEntered} value={emailData} fullWidth></Input>
    <br></br>
    <br></br>
    <Input label="Enter Password" type="password" required onChange={onPasswordEntered} value={passData} fullWidth></Input>
    <br></br>
    <br></br>
    <Input label="Confirm Password" type="password" required onChange={onConfirmPasswordEntered} value={cnfPassData} fullWidth></Input>
    <br></br>
    <br></br>
    <Button variant='filled' size='large' onClick={onRegister}>Register</Button>
    <br></br>
    <hr></hr>
    Already have an account?
    <br></br>
    <br></br>
    <Link to="/login"><Button variant='outlined' size='medium'>LogIn</Button></Link>
    </Card>
    </>
  )
}
