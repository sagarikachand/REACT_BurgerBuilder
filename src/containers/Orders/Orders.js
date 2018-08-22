import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-instance'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


class Orders extends Component {
    state={
        // orders: [],
        // loading: true
    }

    componentDidMount (){
       
        this.props.onFetchOrders(this.props.token , this.props.userId);
        // axios.get('/order.json')
        // .then( (response) =>{
        //     console.log(response)
        //     let fetchedOrders=[];
        //     for( let key in response.data){
        //         fetchedOrders.push({
        //             ...response.data[key],
        //             id:key
        //         })
        //     }
        //     this.setState({ orders:fetchedOrders, loading: false})
        // })
        // .catch( (error) =>{
        //     console.log('error in order fetch')
        //     this.setState({loading : false})
        // })
    }
    /// The parameters from firebase will be string. That is the price will be string. COnvert to numbers.
    render(){
        let orders=null;
        if(this.props.loading){
             orders= <Loader />
        }else {
            if(this.props.orders.length >0){
                orders= this.props.orders.map( (order) =>{
                    // console.log(order.ingredients)
                       return <Order key={order.id} ingredients={order.ingredients} price={+order.price} date={order.orderDate}/>
                })
            }
            else{
                console.log("no show")
                orders =<p>No orders to show!</p>
            }
        }
        
        return(
           <div>
              {orders}
           </div>
        )
    }
}


const mapStateToProps=(state) =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
 
}

const mapDispatch =(dispatch) =>{
    return {
        onFetchOrders : (token , userId) => dispatch(actions.fetchOrders(token ,userId))
    }
   
}




export default connect(mapStateToProps, mapDispatch)(withErrorHandler(Orders,axios));