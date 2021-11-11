import { call, debounce, put, select, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "../../api/studentApi";
import { ListParams, ListResponse, Student } from "../../models";
import { selectStudentFilter, studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch(error) {
    console.log("Failed to fetch student list", error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

function* handleRemove(action: PayloadAction<Student>) {
  try {
    yield call(studentApi.remove, action.payload.id || '');
    yield put(studentActions.removeStudentSuccess());
    const filter: ListParams = yield select(selectStudentFilter);
    yield put(studentActions.fetchStudentList(filter));
  } catch(error) {
    console.log("Remove student error", error);
    yield put(studentActions.removeStudentFailed());
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
  yield takeLatest(studentActions.removeStudent, handleRemove);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}