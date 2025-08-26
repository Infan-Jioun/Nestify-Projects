
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SelectOption {
  value: string
  label: string
}

interface LocationState {
  divisions: SelectOption[]
  districts: SelectOption[]
  upazilas: SelectOption[]
  loading: {
    division: boolean
    district: boolean
    upazila: boolean
  }
}

const initialState: LocationState = {
  divisions: [],
  districts: [],
  upazilas: [],
  loading: {
    division: false,
    district: false,
    upazila: false
  }
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDivisions: (state, action: PayloadAction<SelectOption[]>) => {
      state.divisions = action.payload
    },
    setDivisionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.division = action.payload
    },
    setDistricts: (state, action: PayloadAction<SelectOption[]>) => {
      state.districts = action.payload
    },
    setDistrictLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.district = action.payload
    },
    setUpazilas: (state, action: PayloadAction<SelectOption[]>) => {
      state.upazilas = action.payload
    },
    setUpazilaLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.upazila = action.payload
    },
    resetLocation: (state) => {
      state.divisions = []
      state.districts = []
      state.upazilas = []
      state.loading = { division: false, district: false, upazila: false }
    }
  }
})

export const {
  setDivisions,
  setDivisionLoading,
  setDistricts,
  setDistrictLoading,
  setUpazilas,
  setUpazilaLoading,
  resetLocation
} = locationSlice.actions

export default locationSlice.reducer
