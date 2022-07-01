import React from 'react'
import Alert from '@mui/material/Alert';


export default function Alerts(props) {
  return (
    <Alert 
      severity={props.severity} 
      onClose={() => {}}
    >
      {props.children}
    </Alert>
  )
}


Alert.defaultProps = {
  severity: "info"
}