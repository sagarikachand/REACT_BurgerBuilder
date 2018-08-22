

import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStartAlert = () => {
    return {
        type: actionTypes.AUTH_START_ALERT
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogOut())
        }, expiresIn * 1000)
    }

}

export const authLogOut = () => {
    //Removing auth data from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const auth = (email, password, isSignUp) => {
    console.log(email)

    return (dispatch) => {
        dispatch(authStartAlert())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        //This javascript object will be converted to json automatically by axios

        let defaultUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDuv5_dbbCzPAKHy7FO1dxLFxgh5ScAp-s'
        console.log(isSignUp)
        if (!isSignUp) {
            defaultUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDuv5_dbbCzPAKHy7FO1dxLFxgh5ScAp-s'
        }
        console.log(defaultUrl)

        axios.post(defaultUrl, authData)
            .then((response) => {
                console.log(response)
                //JS time work in milliseconds and the expiresIn that we get in response in iseconds
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch((error) => {

                dispatch(authFail(error.response.data.error))
            })
    }
}


export const checkAuthStatusOnLoad = () => {
    return dispatch => {
          const token = localStorage.getItem('token')
          if(!token){
              dispatch( authLogOut())
          }else{
            const expirationDate= new Date(localStorage.getItem('expirationDate'))
            console.log(expirationDate ,'expirationdate')
              if(expirationDate > Date.now()){
                const userId =localStorage.getItem('usedId')
                dispatch(authSuccess(token , userId))
                //checkAuthTimeout expects the expiresIn in seconds
              const  expireInSeconds= (expirationDate.getTime() - (new Date()).getTime())/1000;
                dispatch( checkAuthTimeout(expireInSeconds))
              }
              else{
                  dispatch(authLogOut())
              }
              
          }
    }
}





