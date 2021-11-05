import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import counterSaga from '../features/counter/couterSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

function* helloSaga() {
  console.log('Hello saga');
}

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([helloSaga(), counterSaga(), authSaga(), dashboardSaga()]);
}