import React, { useState } from 'react'
import style from './style.module.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../button';
import IconMenu from '../../utils/menu';

export default function Profile() {
  const [isMenuClicked, setisMenuClicked] = useState(false);

  function onMenuClicked(){
    setisMenuClicked(!isMenuClicked);
  }
  return (
    <>
    <div className={style.profileIcon}>
        <Button size='small' onClick={onMenuClicked}>
        {
          (isMenuClicked)? <CloseIcon fontSize='large'/> : <AccountBoxIcon fontSize='large' />
        }
          
        </Button>
      </div>
      {
        (isMenuClicked)? <IconMenu/> : <></>
      }
    </>
  )
}
