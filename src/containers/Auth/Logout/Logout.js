import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions/index'

class Logout extends Component {

    componentDidMount () {
        this.props.onLogout()
    }

  render() {
    return <Redirect to= '/' />
      
  }
}


const mapDispatchToProp=(dispatch) =>{
  return {
      onLogout: () =>{ dispatch(actions.authLogOut()) } 
  }
}
export default connect(null,mapDispatchToProp)(Logout);
