import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

export default function Button(props) {

  let type = (props.variant)? style[props.variant] : style.default;
  let size = (props.size)? style[props.size] : style.medium;

  return (
    <button className={`${style.btn} ${type} ${size} `} onClick={props.onClick} disabled={props.disable} >
      {props.children}
    </button>
  )
}


Button.propTypes = {
  onClick : PropTypes.func
}

Button.defaultProps = {
  variant : "default",
  disable : false,
  size : 'medium'
}