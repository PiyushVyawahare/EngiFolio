import React, { useState } from 'react'
import Input from "../../components/input";
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button'
import Heading from '../../components/heading';
import Card from '../../components/card';
import api from '../../api'
import Alert from '@mui/material/Alert';


export default function Login() {

  const [emailData, setEmailData] = useState("");
  const [passData, setPassData] = useState("");
  const [successAlert, setSuccessAlert] = useState(0);
  const [errorAlert, setErrorAlert] = useState(0);
  let navigate = useNavigate();

  const errorMessages = {
    200: "Logging in....",
    401: "Username or Password is incorrect!!",
    404: "User not found!!",
    201: "User is not verified, verification OTP sent!!",
    500: "Internal serevr error!!",
    402: "Required* fields can't be empty!!"
  }

  function onEmailEntered(event){
    setEmailData(event.target.value);
  }

  function onPasswordEntered(event){
    setPassData(event.target.value);
  }

  function closeSuccessAlert(){
    setSuccessAlert(false);
  }

  function closeErrorAlert(){
    setErrorAlert(false);
  }

  function onLogin(){

    if(emailData === "" || passData === ""){
      setErrorAlert(402);
      return;
    }

    api.post('/login', {
      email: emailData,
      password: passData
    }, { withCredentials: true})
    .then(function(res){
      if(res.status === 200){
        setSuccessAlert(200);
        setErrorAlert(0);
        setTimeout(function(){
          console.log(res);
          
          navigate("/");
        }, 3000)
      }
      else if(res.status === 201){
        setSuccessAlert(201);
        setErrorAlert(0);
        console.log("first");
        setTimeout(function(){
          console.log(res);
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}});
        }, 3000)
      }
      else{
        setErrorAlert(res.status);
        setSuccessAlert(0);
      }
    }).catch(function(err){
      setErrorAlert(err.response.status);
      setSuccessAlert(0);
    });
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
    <Heading>LogIn</Heading>
    <br></br>
    <Input label="Enter Email" type="email" required onChange={onEmailEntered} value={emailData} fullWidth></Input>
    <br></br>
    <br></br>
    <Input label="Enter Password" type="password" required onChange={onPasswordEntered} value={passData} fullWidth></Input>
    <br></br>
    <br></br>
    <Button variant='filled' size='large' onClick={onLogin}>LogIn</Button>
    <br></br>
    <hr></hr>
    Don't have an account?
    <br></br>
    <br></br>
    <Link to="/register"><Button variant='outlined' size='medium'>Register</Button></Link>
    </Card>
    </>
  )
}
