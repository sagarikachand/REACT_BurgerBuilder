
import React ,{Component} from 'react'
//AsyncComponent is a plain JS function which returns a class based component and takes an function reference as argument
const AsyncComponent =(importComponent)=>{
  
    return class extends Component {
        state={
            component : null
        }
        componentDidMount(){
            importComponent()
                .then(cmp => {
                    this.setState({component : cmp.default})
                })
            
        }

        render(){
            const C= this.state.component
            return(
               C ? <C {...this.props} /> : null
            )
        }
    }
}

export default AsyncComponent