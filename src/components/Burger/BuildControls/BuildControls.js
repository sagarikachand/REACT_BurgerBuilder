import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {

    return (

        <div className={classes.BuildControls}>
         <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong> </p>
            {
                controls.map((ctrl) => {
                    return <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        addIngredient={() => props.addIngredient(ctrl.type)} 
                        removeIngredient ={() => props.removeIngredient(ctrl.type)}
                        disabled={props.disableInfo[ctrl.type]}/>
                })
            }
            <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable} 
            onClick={props.order}>{props.isAuth ? 'ORDER NOW ': 'SIGN UP/SIGN IN TO ORDER'}</button>
        </div>
    )

}
export default BuildControls;