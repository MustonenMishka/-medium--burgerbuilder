import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {
        purchaseMode: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        for (const ingr in ingredients) {
            sum += ingredients[ingr]
        }
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchaseMode: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchaseMode: false})
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Can't load ingredients!</p> : <Spinner/>;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}/>;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchaseMode}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));