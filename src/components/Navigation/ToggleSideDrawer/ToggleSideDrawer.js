import React from 'react'
import classes from './ToggleSideDrawer.css'

const ToggleSideDrawer = (props) => {
    return (

        <div onClick={props.open} className={classes.ToggleSideDrawer}>
         <div ></div>
         <div ></div>
         <div ></div>

        </div>
    
    )
}


export default ToggleSideDrawer;