import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get('https://react-burger-e3f3a.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(res.data))
    } catch (err) {
        yield put(actions.fetchIngredientsFailed())
    }
}