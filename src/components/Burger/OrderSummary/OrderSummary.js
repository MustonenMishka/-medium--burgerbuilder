import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = [];
    for (const ingr in props.ingredients) {
        ingredientSummary.push(
            <li key={ingr}>
                <span style={{textTransform: 'capitalize'}}>{ingr}</span>: {props.ingredients[ingr]}
            </li>)
    }
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with these ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;