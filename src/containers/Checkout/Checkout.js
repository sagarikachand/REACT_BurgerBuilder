import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route , Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {
      
    cancelCheckoutHandler =()=>{
     this.props.history.goBack();
    }

    countinueCheckoutHandler=()=>{
      this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary=    <Redirect to ="/" />

        if(this.props.ingredients){
            const purchaseRedirect= this.props.purchased ? <Redirect to="/" /> : null
            summary=(<div>

                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={this.props.ingredients} 
                cancelCheckout={this.cancelCheckoutHandler}
                continueCheckout={this.countinueCheckoutHandler}/>

                <Route path={this.props.match.path + '/contact-data'} 
                      render ={ (props) => (<ContactData   {...props} />) } />  
            </div>)
        }
        return summary
            
 
        
    }
}

const mapStateToProps =(state) =>{
    return {
        ingredients : state.burgerBuilder.ingredients ,
        purchased : state.order.purchased
       
    }
}

export default connect(mapStateToProps)(Checkout);