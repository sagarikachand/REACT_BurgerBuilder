import React, { Component } from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    //Here we will re render Modal only when the show property has changed. 
    // When this modal is used in other component the modal will be re rendererd if parent components props change even when modal is not visible.
    //So by per forming the below check we are ensuring that modal is re rendered only when the nextProps of show is not equal to what the modal currently has before update.
    // Here when the children to this Modal change then also we have to re render it. 
    shouldComponentUpdate(nextProps , nextState) {
     return nextProps.show !==this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate(){
        console.log("Modal will update")
    }
     render(){
        return (
            <Aux>
                <div className={classes.Modal} 
                style={{
                   transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                   opacity: this.props.show ? '1' : '0',
               
                }}>
                {this.props.children}
            </div>
            <Backdrop show={this.props.show} close={this.props.closeModal}/>
                </Aux>
            
        )
     }
   
}

export default Modal;