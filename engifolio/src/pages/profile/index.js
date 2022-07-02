import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import api from '../../api'
import './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

  const [userData, setUserData] = useState(null);

  var navigate = useNavigate();

  async function onLoad(){
    console.log(1);

    try{
      let res = await api.get("/", {withCredentials: true});
      setUserData(res.data);
    }
    catch(err){
      setUserData(null);
      console.log(4);
      navigate("/");
    }
  }

  useEffect(() => {
    onLoad();
  }, []);
  console.log(3);
  return (
    <>
    {
      (userData!=null)
      ?
      <>
        <Card>
          <p>{userData.email}</p>
          <p>{userData.name}</p>
        </Card>
      </>
      :
      <>fzfsg</>
    }
    </>
  )
}
