import React ,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import {checkValidity}  from '../../shared/utility'

import Loader from '../../components/UI/Loader/Loader';
const AUTH_ALERTS={
        'INVALID_EMAIL' : 'Invalid Email ID',
        'INVALID_PASSWORD' : 'Password in not valid',
        'MISSING_PASSWORD' : 'Please Enter a password',
        'EMAIL_NOT_FOUND'  : 'Email ID not found',
        'EMAIL_EXISTS'  :'Email Id already exist',
        'WEAK_PASSWORD : Password should be at least 6 characters' : 'Password should be at least 6 char',
         'MISSING_EMAIL': 'Please enter an Email Id'
}

class Auth extends Component {
   

    componentDidMount(){
        if(!this.props.buildingburger && this.props.redirectPath !== '/'){
            this.props.onSetAuthRedirectPath()  
        }
    }

    state={
        controls:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
                validationMessage: 'Email is required & should be of format : abc@xyz.com'
              
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
                validationMessage:'Password is required and should be minimum 6 character'
              
            },
            
        },
        isSignUp: true
    }


  
  inputChangeHandler=(event,controlName) =>{
    const updatedState ={
         ...this.state.controls,
         [controlName] :{
             ...this.state.controls[controlName],
             value: event.target.value,
             valid: checkValidity(event.target.value , this.state.controls[controlName].validation ),
             touched:true
         }
    }

    this.setState({controls : updatedState})
  }
  handleSubmit=(event)=>{
   event.preventDefault();
   this.props.onAuth(this.state.controls.name.value , this.state.controls.password.value ,this.state.isSignUp)
  }

  handleAuthMode =() =>{
      this.setState(prevState =>{
        return {isSignUp : !prevState.isSignUp}
      })
  }
    
    render(){   

        let formElementArr = [];
        for (let key in this.state.controls) {
            formElementArr.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =    formElementArr.map( (formElement) =>{
            return <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            validationMesg={formElement.config.validationMessage}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
           
        })

        if(this.props.loading){
            form =<Loader />
        }

        let errorMesg= null;
        if(this.props.error != null){
            errorMesg= <p>{AUTH_ALERTS[this.props.error.message]}</p>
        }

        let authRedirect= null;
        if(this.props.isAutheticated){
            authRedirect =  <Redirect to ={this.props.redirectPath} />
        }
        return(
            <div className={classes.Auth}>
            {authRedirect}
            {errorMesg}
             <form onSubmit={this.handleSubmit}>
              {form}
             <Button btnType="Success">{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</Button>
             </form>
             <Button  btnType="Danger" clicked={this.handleAuthMode}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}  </Button>
            </div>

        )
    }
}



const mapStateToProp =(state) =>{
    return {
        loading : state.auth.loading ,
        error : state.auth.error,
        isAutheticated : state.auth.token !== null,
        buildingburger : state.burgerBuilder.building ,
        redirectPath : state.auth.redirectPath
    }
}

const mapDispatchToProps =(dispatch) =>{
   return {
        onAuth : (email,password,isSignUp) =>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(Auth);