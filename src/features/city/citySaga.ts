import { call, put, takeLatest } from "@redux-saga/core/effects";
import cityApi from "../../api/cityApi";
import { City, ListResponse } from "../../models";
import { cityActions } from "./citySlice";

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response.data));
  } catch(error) {
    console.log('Failed to fetch city list', error);
    yield put(cityActions.fetchListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList, fetchCityList);
}