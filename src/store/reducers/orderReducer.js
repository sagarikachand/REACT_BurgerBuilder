import * as actionTypes from '../actions/actionTypes'


const initialState={
    orders:[],
    checkOutProgress : false,
    purchased: false,
    loading:false
}
const purchaseInit =(state,action) =>{
  
    return{
        ...state,
        purchased:false
    }
}
const placeOrderStartAlert =(state,action) =>{
    return {
        ...state,
        checkOutProgress:true
        }
}
const placeOrder =(state,action) =>{
    const newOrder ={
        ...action.orderData,
        id: action.orderId
    }
 return {
    ...state,
    orders: state.orders.concat(newOrder),
    checkOutProgress:false,
    purchased : true
    }
}
const placeOrderFail =(state,action) =>{
    return {
        ...state,
        checkOutProgress:false,
        
        }
}
const fetchOrderStartAlert =(state,action) =>{
    return {
        ...state,
        loading: true

    }
}
const fetchOrderSuccess =(state,action) =>{
    let allOrders=[];
        return {
            ...state,
            orders: allOrders.concat(action.orders),
            loading: false

        }
}
const fetchOrderFail =(state,action) =>{
    return {
        ...state,
        loading: false

    }
}

const orderReducer =( state =initialState ,action) =>{

    switch(action.type){

        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action)
        case actionTypes.PLACE_ORDER_START_ALERT :  return placeOrderStartAlert(state,action)
        case actionTypes.PLACE_ORDER :  return placeOrder(state,action)
        case actionTypes.PLACE_ORDER_FAIL :  return placeOrderFail(state,action)
        case actionTypes.FETCH_ORDERS_START_ALERT:  return fetchOrderStartAlert(state,action)
        case actionTypes.FETCH_ORDERS_SUCCESS:  return fetchOrderSuccess(state,action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state,action)
        default: return state;
    }
}

export default orderReducer;