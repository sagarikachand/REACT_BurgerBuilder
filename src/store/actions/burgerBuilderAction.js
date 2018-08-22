
import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const addIngredient =(ingredientName) =>{
 
    return{
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName : ingredientName
    }
}


export const removeIngredient =(ingredientName) =>{
 
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingredientName
    }
}

export const setInitIngredients =(ingredients) =>{
   return {
       type:actionTypes.SET_INIT_INGREDIENTS ,
       ingredients: ingredients
   }
}

export const setInitIngredientsFail =() =>{
   
    return {
        type:actionTypes.SET_INIT_INGREDIENTS_FAIL ,
  
    }
 }

export const fetchInitIngredients =() =>{
    return dispatch =>{
           axios.get('https://react-burger-65c1d.firebaseio.com/ingredients.json')
        .then(response => {
            return dispatch(setInitIngredients(response.data))
        })
        .catch(() =>{ return dispatch(setInitIngredientsFail() ) } )

        
    }

}