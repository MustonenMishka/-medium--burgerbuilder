import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
}

export function* authSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIhCiuu9j0zr0ZKeLuNi77TIqHPj8UuJo';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIhCiuu9j0zr0ZKeLuNi77TIqHPj8UuJo';
    }
    try {
    const res = yield axios.post(url, authData);
            const expDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
            yield localStorage.setItem('expirationDate', expDate);
            yield localStorage.setItem('userId', res.data.localId);
            yield put(actions.authSuccess(res.data.idToken, res.data.localId));
            yield put(actions.checkAuthTimeout(res.data.expiresIn))
    } catch(err) {
            yield put(actions.authFailed(err.response.data.error));
        }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout())
    } else {
        const expDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expDate.getTime() - new Date().getTime())/1000));
        } else {
            yield put(actions.logout())
        }
    }
}