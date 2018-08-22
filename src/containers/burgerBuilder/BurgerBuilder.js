import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-instance'
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'


/*  NOW HANDLED BY REDUX */
// const INGREDIENTS_PRICE = {
//     salad: 0.5,
//     meat: 0.7,
//     bacon: 0.6,
//     cheese: 0.6
// }





class BurgerBuilder extends Component {
    //    constructor(props){
    //     super(props);
    //     this.state ={
    //         ingredients
    //     }   
    // }

    state = {
        // ingredients: null,  We are not using local state anymore for ingredients and totalPrice
        // totalPrice: 4,
        purchasable: false,
        showSummary: false,
        checkOutProgress: false,
        error: false
        // ingredientsList:['salad','bacon', 'cheese','meat']

    }

    componentDidMount() {

        this.props.onInitIngredients();
        /*
        This particular http call will be handled in redux
        */

        // axios.get('https://react-burger-65c1d.firebaseio.com/ingredients.json')
        // .then(response => {
        //  return  this.setState({ ingredients: response.data })
        // })
        // .catch(()=>{ this.setState ({error :true})})

    }
    /* You can manage this purchasable state in reducer also */
    updatePurchaseState = (updatedIngredients) => {

        const sum = Object.keys(updatedIngredients).map((igkey) => {
            return updatedIngredients[igkey]
        })
            .reduce((prev, curr) => {
                return prev + curr
            }, 0)

        return sum > 0

    }


    purchasehandler = () => {
        if(this.props.isAuth){
            this.setState({ showSummary: true })
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    modalCloseHandler = () => {
        this.setState({
            showSummary: false
        })
    }

    checkouthandler = () => {
        console.log("executing checouthandler and resetting the purchased state for checkout page")
        this.props.onPurchaseInit();
        this.props.history.push('/checkout')
    }
    render() {
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let burger = this.props.error ? <p>Can't load the ingredients</p> : <Loader />
        let orderSummary = null;

        if (this.props.ingredients) {
            burger =
                (<Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={(type) => this.props.onAddIngredient(type)}
                        removeIngredient={(type) => this.props.onRemoveIngredient(type)}
                        disableInfo={disableInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        isAuth ={this.props.isAuth}
                        order={this.purchasehandler} />
                </Aux>);

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                close={this.modalCloseHandler}
                proceed={this.checkouthandler} />
        }



        if (this.state.checkOutProgress === true) {

            orderSummary = <Loader />
           
        }

        return (
            <Aux>

                <Modal show={this.state.showSummary} closeModal={this.modalCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth : state.auth.token !== null
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.fetchInitIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))



//You can wrap a component in an hoc, the hoc will get the wrappedComponent and any other paramater you pass.
//The hoc return another component, either class based or functional component


/*
addIngredienthandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const newCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }
*/