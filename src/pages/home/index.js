import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import './style.module.css'
export default function Home() {

  var location = useLocation();

  return (
    <>
    {
      (!location.state)
      ?
      <>
        <Navbar isLoggedIn = {false}></Navbar>
      </>
      :
      <>
        <Navbar isLoggedIn = {location.state.flag}>
          {location.state.name}
        </Navbar>
      </>
    }
    <div>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
    </>
  )
}
