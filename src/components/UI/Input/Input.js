import React from 'react'
import classes from './Input.css'


const Input =(props)=>{

    let inputClasses =[classes.InputElement]
    let validationMesg= null;
    if(props.invalid && props.shouldValidate && props.touched){
         inputClasses.push(classes.Invalid)
        validationMesg=<p className={classes.Alert}>{props.validationMesg}</p>

    }
    let inputElement= null;
     switch( props.elementType){
         case 'input':
         inputElement = <input className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value}  onChange={props.changed}/>
         break;

         case 'textarea':
         inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
         break;
         
         case 'select':
         inputElement=(<select className={inputClasses.join(' ')} 
                               onChange={props.changed}
                               value={props.value}>
                         {props.elementConfig.options.map((option)=>{
                            return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })}
                        </select>)
          break;

         default :
         inputElement =<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    
     
     }


    return (

        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
            {validationMesg}
        </div>
    )
}


export default Input;