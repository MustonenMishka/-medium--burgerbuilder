import React, {Component} from 'react';
import axios from "../../../axios-orders";
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let input in this.state.orderForm) {
            formData[input] = this.state.orderForm[input].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangedHandler = (e, inputId) => {
        const updatedFormEl = updateObject(this.state.orderForm[inputId],{
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[inputId].validation),
            touched: true
            }
            );
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputId]: updatedFormEl
        });

        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid})
    };

    render() {
        const formElementsArray = [];
        for (let input in this.state.orderForm) {
            formElementsArray.push({
                id: input,
                config: this.state.orderForm[input]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEl => (
                    <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        invalid={!formEl.config.valid}
                        changed={(e) => this.inputChangedHandler(e, formEl.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));