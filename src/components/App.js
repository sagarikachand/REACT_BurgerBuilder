import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'
// import Auth from '../containers/Auth/Auth'

import './App.css';
import BurgerBuilder from '../containers/burgerBuilder/BurgerBuilder';
// import Checkout from '../containers/Checkout/Checkout';
import { Route, Switch  , withRouter ,Redirect} from 'react-router-dom'
// import Orders from '../containers/Orders/Orders';
import Logout from '../containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import AsyncComponent from '../hoc/asyncComponent/AsyncComponent'


//Lazy Loading
const asyncCheckout= AsyncComponent( () =>{
  return import('../containers/Checkout/Checkout')
})

const asyncAuth= AsyncComponent( () =>{
  return import('../containers/Auth/Auth')
})

const asyncOrders= AsyncComponent( () =>{
  return import('../containers/Orders/Orders')
})

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthStatusOnLoad()
  }

  render() {

    let routes=(
      <Switch>
          <Route path="/auth"   component={asyncAuth} />
          <Route path="/" exact  component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuth){
      routes=
      (<Switch>
      <Route path="/checkout" component={asyncCheckout} />
      <Route path="/orders"   component={asyncOrders} />
      <Route path="/logout"   component={Logout} />
      <Route path="/auth"   component={asyncAuth} />
      <Route path="/" exact  component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>)
    }
    return (
      <div className="App">
        <Layout>
           {routes}
       
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    isAuth : state.auth.token!==null
  }
}
const mapDispatchtoprops =(dispatch)=>{
  return{
    onCheckAuthStatusOnLoad : () =>{ dispatch(actions.checkAuthStatusOnLoad())}
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchtoprops)(App));
