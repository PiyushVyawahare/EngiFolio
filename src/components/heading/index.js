import React from 'react'
import './style.module.css'

export default function Heading(props) {

  return (
    <h1>
      {props.children}
    </h1>
  )
}
