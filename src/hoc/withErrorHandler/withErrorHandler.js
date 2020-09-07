import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            this.catchErrors();
        }
        state = {
            error: null
        };

        catchErrors() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,
                error => this.setState({error}))
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeErrorHandler = () => {
            this.setState({error: null})
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.closeErrorHandler}>
                        {this.state.error ?
                            this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;