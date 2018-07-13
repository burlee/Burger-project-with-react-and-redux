import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../aux_x';

 const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component{
      state ={
          error: null
      }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.response.use( req  =>{
                this.setState({error: null});
                return req;
            })
            this.resInterceptor =axios.interceptors.response.use( null, error =>{
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorHandlerConfirmed = () => {
            this.setState({error: null})
        }
        render(){
            return(
                <Aux>
                  <Modal show={this.state.error} 
                         modalClosed={this.errorHandlerConfirmed} >

                      {this.state.error ? this.state.error.message : null}

                  </Modal>
                  <WrappedComponent {...this.props} />
                </Aux>
            )
        }
  }
}

export default withErrorHandler;
