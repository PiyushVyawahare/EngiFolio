import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import api from '../../api'
import './style.module.css'
export default function Home() {

  var location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [emailData, setEmailData] = useState("");
  const [nameData, setNameData] = useState("");


  function onLoad(){
    api.get("/", {withCredentials: true})
    .then(function(res){
      if(res.status === 200){
        setIsLoggedIn(1);
        setEmailData(res.data.email);
        setNameData(res.data.name);
      }
      else
        setIsLoggedIn(0);
    })
    .catch(function(err){
      console.log(err);
      setIsLoggedIn(0);
    })
  }

  return (
    <>{onLoad()}
    {
      (!isLoggedIn)
      ?
      <>
        <Navbar isLoggedIn = {false}></Navbar>
      </>
      :
      <>
        <Navbar isLoggedIn = {true}>
        </Navbar>
      </>
    }
    <div>
      <p>{emailData}</p>
      <p>{nameData}</p>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
    </>
  )
}
