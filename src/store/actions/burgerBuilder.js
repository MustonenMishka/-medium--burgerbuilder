import * as actionTypes from './actionTypes';

export const addIngredient = (ingrName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingrName
    }
};
export const removeIngredient = (ingrName) => {
    return {
        type: actionTypes.DEL_INGREDIENT,
        ingrName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
}
