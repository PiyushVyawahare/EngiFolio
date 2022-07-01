import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../../components/input'
import Button from '../../components/button'
import Card from '../../components/card'
import Heading from '../../components/heading'
import Alert from '@mui/material/Alert';
import api from '../../api';

export default function VerifyUser() {

  const [otpData, setOtpData] = useState("");
  const [successAlert, setSuccessAlert] = useState(0);
  const [errorAlert, setErrorAlert] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessages = {
    200: "Email verified Successfully!",
    500: "Internal serevr error!!",
    400: "Required* fields can't be empty!!",
    401: "OTP Invalid!!",
    404: "User doesn't exist",
    201: "OTP sent successfully",
  }

  function onOtpEntered(event){
    setOtpData(event.target.value);
  }

  function closeSuccessAlert(){
    setSuccessAlert(0);
  }

  function closeErrorAlert(){
    setErrorAlert(0);
  }

  function onSubmit(){
    api.post("/verifyUser", {
      userId: location.state.userId,
      otp: otpData,
    })
    .then(function(res){
      if(res.status === 200){
        setSuccessAlert(200);
        setErrorAlert(0);
        setTimeout(function(){
          console.log(res);
          navigate("/login");
        }, 3000)
      }
    })
    .catch(function(err){
      setErrorAlert(err.response.status);
      setSuccessAlert(0);
    })
  }


  function onResendOtp(){
    api.post("/resendOtp", {
      userId: location.state.userId,
    })
    .then(function(res){
      if(res.status === 201){
        setSuccessAlert(201);
        setErrorAlert(0);
      }
      else{
        setErrorAlert(res.status);
        setSuccessAlert(0);
      }
    })
    .catch(function(err){
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

    {
      (!(location.state))
      ?
      (<Alert severity="error" variant='filled' onClose={closeErrorAlert}>You are not authorized to access this page.</Alert>)
      :
      <>
        <Card>
        <Heading>Enter OTP</Heading>
        <br></br>
        <p>OTP sent on <strong>Email: {location.state.email}</strong></p>
        <br></br>
        <Input label="Enter OTP" type="text" required onChange={onOtpEntered} value={otpData} fullWidth></Input>
        <br></br>
        <br></br>   
        <Button variant='filled' size='large' onClick={onSubmit}>Submit OTP</Button>
        <br></br>
        <hr></hr>
        <p>Didn't received OTP?</p>
        <Button variant='outlined' size='medium' onClick={onResendOtp}>Resend OTP</Button>
        </Card>
      </>
    }

    </>
  )
}
