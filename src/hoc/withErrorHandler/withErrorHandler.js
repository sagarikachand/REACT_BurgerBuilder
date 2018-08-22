import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'


//This HOC is returning a  class based component. It can also return a functional compoenent

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentWillMount = () => {
           this.reqInterceptors= axios.interceptors.request.use(
               
                req => {
                    this.setState({error: null})
                    return req
                }

            )
            this.resInterceptors =axios.interceptors.response.use(
                res=>res,
                error => {
                    this.setState({error: error})
                }

            )
        }

        componentWillUnmount(){
            console.log('removing interceptor', this.reqInterceptors, this.resInterceptors)
             axios.interceptors.request.eject(this.reqInterceptors)
             axios.interceptors.response.eject(this.resInterceptors)
        }

        closeModal =() =>{
            this.setState({error: null})
        }
        //The Modal compoenent will always be present event if we do not show it.
        //So initiially the property error.message will not be available

        //Here the wrapped Component is the child component. The parent componentDidmount will run only after the child componentDidmount. So,
        //when there will be error in child component till then the axios interceptors will not be set and this Error component will not active the error modal.
        //So register the interceptors on compoennt Will mount
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                          closeModal={this.closeModal}>
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>


            )
        }
    }

}

export default withErrorHandler;