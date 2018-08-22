import * as actionTypes from '../actions/actionTypes'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 0.7,
    bacon: 0.6,
    cheese: 0.6
}


const addIngredient = (state, action) => {
    return {
        ...state,
        building: true,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]

    }
}

const removeIngredient = (state, action) => {
    return {
        ...state,
        building: true,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]


    }
}

const setInitIngredient = (state, action) => {
    return {
        ...state,
        building: false,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    }
}

const setInitIngredientFail = (state, action) => {

    return {
        ...state,
        error: true
    }
}


const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:  return addIngredient(state, action)
            break;

        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action)
            break;

        case actionTypes.SET_INIT_INGREDIENTS: return setInitIngredient(state, action)
            break;

        case actionTypes.SET_INIT_INGREDIENTS_FAIL: return setInitIngredientFail(state, action)
            break;

        default:
            return {
                ...state
            }
            break;
    }

}


export default burgerBuilderReducer;