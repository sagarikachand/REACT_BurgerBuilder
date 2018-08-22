import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-instance'
import Loader from '../../../components/UI/Loader/Loader'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {checkValidity} from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMesg:'Mandatory Filed'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMesg:'Mandatory Filed'
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required:true,
                    minLength: 5,
                    maxLength :5
                },
                valid:false,
                touched:false,
                validationMesg:'Mandatory Filed.Must be 5 character long'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMesg:'Mandatory Filed.'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                validationMesg:'Mandatory Filed.'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation:{},
                valid:true,
                validationMesg:''
             
            }
        },
        formIsValid: false

 
    }
   
    
    inputChangeHandler = (event, inputIdentifier) => {
       
        //First clone the entire orderForm. But this is not a deep copy. The inner Object are still same

        let updatedOrderForm = { ...this.state.orderForm }
        //Now make a clone of the inner object whose value we have to update
        //As here we are only updating the value property and not any property inside the elementConfig object so we need not clone object any further.
        //If necesaary we have to make deep copy of any neseted object where there is a change.

        let updatedFormElement = { ...this.state.orderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value , updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement)
        //Finally calling setstate to update the state.
       

        let formIsValid =true;
        for(let inputid in updatedOrderForm){

            formIsValid = updatedOrderForm[inputid].valid && formIsValid
       
        } 
        this.setState({ orderForm: updatedOrderForm , formIsValid: formIsValid},()=>console.log(this.state))
   
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ checkOutProgress: true })

        const formData= {}
        for(let inputidentifier in this.state.orderForm){
            formData[inputidentifier] = this.state.orderForm[inputidentifier].value;
        }
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData,
            orderDate:Date.now(),
            userId: this.props.userId
         }

         this.props.onOrder(orderData, this.props.token);

        // axios.post('/order.json', orderData)
        //     .then((response) => {
        //         console.log(response)

        //         this.setState({

        //             checkOutProgress: false
        //         })
        //         this.props.history.push('/')
        //     })
        //     .catch((error) => {
        //         console.log('contactData axios error')
        //         console.log(error)
        //         this.setState({

        //             checkOutProgress: false
        //         })
        //     })

    }

    render() {
        let formElementArr = [];
        for (let key in this.state.orderForm) {
            formElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        // console.log(formElementArr)
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArr.map((formElement) => {
                return <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    validationMesg={formElement.config.validationMesg}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            })}
            
            <Button btnType="Success" isdisabled={!this.state.formIsValid}>ORDER </Button>
        </form>
        )

        if (this.props.checkOutProgress) {
          
            form = <Loader />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Details</h4>
                {form}
            </div>

        )
    }
}


const mapStateToProps =(state) =>{
   return {
        ingredients : state.burgerBuilder.ingredients,
         price : state.burgerBuilder.totalPrice,
         checkOutProgress : state.order.checkOutProgress,
         token: state.auth.token,
         userId : state.auth.userId
        
         
    }
}

const mapDispatchToProps =(dispatch) =>{
   
    return {
        onOrder: (orderData,token) =>   dispatch(actions.placeOrderStart(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ContactData, axios))