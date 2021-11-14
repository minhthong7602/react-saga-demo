import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { City } from "../../models";

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: []
}

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<City[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchListFailed(state) {
      state.loading = false;
    }
  }
});

// Actions
export const cityActions = citySlice.actions;

// Selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: {
      [key: string]: City
    }, city) => {
      map[city.code] = city;
      return map;
    }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) => 
  cityList.map(c => ({
    value: c.code,
    label: c.name
})));

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;