import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import {connect} from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component  {
   constructor(props){
       super(props);
       this.state={
           showSideDrawer :false
       }
   }

   sideDrawerCloseHandler =()=>{
       this.setState({showSideDrawer: false})
   }

   sideDrawerOpenHandler =() =>{
       this.setState({showSideDrawer : true})
   }
    render() {
        return (
            <Aux>
               <Toolbar open={this.sideDrawerOpenHandler} isAuth={this.props.isAuthenicated}/>
               <SideDrawer open={this.state.showSideDrawer}  close={this.sideDrawerCloseHandler} isAuth={this.props.isAuthenicated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
    
            </Aux>
        )
    }
    
}


const mapStateToProps =(state) =>{
   return {
    isAuthenicated : state.auth.token!==null
}
   } 
export default connect(mapStateToProps)(Layout)