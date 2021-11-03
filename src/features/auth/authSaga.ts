import { call, delay, fork, put, take, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  console.log('Handle login', action.payload);
  yield delay(1000);
  localStorage.setItem('access_token', 'fake_token');
}

function* handleLogout() {
  yield delay(500);
  console.log('Logout');
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  while(true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if(!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action);
    }
    
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield  fork(watchLoginFlow);
  //  yield takeEvery(authActions.logout.type, handleLogout);
  //  yield takeEvery(authActions.login.type, handleLogin);
}