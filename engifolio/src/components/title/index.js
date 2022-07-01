import React from 'react'
import "./style.module.css"

export default function Title(props) {
  return (
    <h4>
      {props.children}
    </h4>
  )
}
