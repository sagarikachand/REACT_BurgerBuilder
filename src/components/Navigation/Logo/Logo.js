import React from 'react'
import classes from './Logo.css'
import logoPath from '../../../assests/images/burger-logo.png'

const Logo =()=>{
    return (
        <div className={classes.Logo}>
            <img src={logoPath}/>
        </div>
        
    )
}

export default Logo;