import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary =(props) =>{

    const ingredientsSummary = Object.keys(props.ingredients).
         map(( igkey ) =>{
             return ( <li key={igkey}>
                <span style={ {textTransform: 'capitalize'} }> {igkey} </span> : {props.ingredients[igkey]} 

             </li>)
         })
  return (
      <Aux>
       <h1> Your Order</h1>
       <p>Here is your delicious burger with the following ingredients: </p>
       <ul>
         {ingredientsSummary}
       </ul>
        <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
       <p>Proceed to Checkout?</p>
       <Button btnType="Danger" clicked={props.close}>CANCEL</Button>
       <Button btnType="Success" clicked={props.proceed}>CONTINUE</Button>

       </Aux>

  )
}

export default OrderSummary