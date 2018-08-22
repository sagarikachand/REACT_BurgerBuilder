
import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import classes from './Burger.css'


const Burger = (props) => {

    const ingredientsArr = Object.keys(props.ingredients);
    //the allIngredients is an array of arrays. This may be an array of empty arrays.
    //So allIngredients.length wont tell us if we have received any ingredients or not.
    //The prevValue in reduce is the prev or intial reduced array. And current value is the value for which this iteratiom is running.
   
    let allIngredients = ingredientsArr.map(
        (igKey) => {
   
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            })
        }

    )
    .reduce((prevValue, currValue)=>{
        return prevValue.concat(currValue)
    },[]) ;

   if(allIngredients.length==0){
      allIngredients = <p>Please start adding Ingredients! </p>
   }
  
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top' />
            {allIngredients}
            <BurgerIngredients type='bread-bottom' />
        </div >
    )
}

export default Burger;