import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../../components/logo'
import Button from '../button'
import Menu from '../menu'
import style from './style.module.css'


export default function Navbar(props) {
  


  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Logo/>
        <h3>EngiFolio</h3>
      </div>
      {
        (props.isLoggedIn)
        ?
        (<><Menu/></>)
        :
        (<div className={style.buttons}>
          <Link to="/login"><Button variant='outlined' size='large'>Login</Button></Link>
        </div>)
      }
    </div>
  )
}
