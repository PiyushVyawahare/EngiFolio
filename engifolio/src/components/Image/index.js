import React from 'react'
import temp from "../../temp/temp.jpg"
import "./style.module.css"

export default function Image(props) {
  return (
    <img 
      src={props.src} 
      alt={props.alt}
    />
  )
}

Image.defaultProps = {
  src: temp,
  alt: "image"
}
