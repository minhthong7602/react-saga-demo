import { all, takeLatest, call } from "@redux-saga/core/effects";
import { dashboardActions } from "./dashboardSlice";

function* fetchStatistics() {

}

function* fetchHighestStudentList() {

}

function* fetchLowestStudentList() {

}

function* fetchRankingByCityList() {

}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ])
  } catch(error) {
    console.log(error);
  }
}
export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}