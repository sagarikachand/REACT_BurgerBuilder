import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'


export const placeOrder = (id, orderData) => {

    return {
        type: actionTypes.PLACE_ORDER,
        orderId:id,
        orderData: orderData
    }

}

export const placeOrderFail = (error) => {
    return {
        type: actionTypes.PLACE_ORDER_FAIL,
        error: error

    }
}

export const placeOrderStartAlert = () => {
    console.log("placeOrderStartAlert")
    return {
        type: actionTypes.PLACE_ORDER_START_ALERT,
      }
}

export const placeOrderStart = (orderData,token) => {
    console.log("placeOrderStart")
    return dispatch => {
        
        dispatch(placeOrderStartAlert());
        axios.post('/order.json?auth=' + token, orderData)
            .then(response => {
                return dispatch(placeOrder(response.data, orderData))
            })
            .catch(error => {
                return dispatch(placeOrderFail(error))
            })
    }
}


export const purchaseInit =() =>{
    return {
        type: actionTypes.PURCHASE_INIT,
      }
}

export const fetchOrdersStartAlert=() =>{
    console.log("fetch order start action")
    return{
        type : actionTypes.FETCH_ORDERS_START_ALERT
    }
}

export const fetchOrdersSuccess=(fetchedOrders) =>{
    return{
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders:fetchedOrders
    }
}

export const fetchOrdersFail=() =>{
    return{
        type : actionTypes.FETCH_ORDERS_FAIL,
       
    }
}
export const fetchOrders =(token ,userId) =>{
   return dispatch =>{
       
    dispatch(fetchOrdersStartAlert());
    const queryParams= `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios.get('/order.json' + queryParams)
    .then( (response) =>{
        console.log(response)
        let fetchedOrders=[];
        for( let key in response.data){
            fetchedOrders.push({
                ...response.data[key],
                id:key
            })
        }
       return dispatch(fetchOrdersSuccess(fetchedOrders))
    })
    .catch( (error) =>{
        
       return dispatch(fetchOrdersFail())
       
    })

   }

    
}