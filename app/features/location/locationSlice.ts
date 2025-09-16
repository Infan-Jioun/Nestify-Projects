
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SelectOption {
  value: string
  label: string
}

interface LocationState {
  geoCountryLocation: SelectOption[]
  loading: {
    geoCountryLocation: boolean

  }
}

const initialState: LocationState = {
  geoCountryLocation: [],

  loading: {
    geoCountryLocation: false,

  }
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setGeoCountryLocation: (state, action: PayloadAction<SelectOption[]>) => {
      state.geoCountryLocation = action.payload;
    },

    resetLocation: (state) => {
      state.geoCountryLocation = []

      state.loading = { geoCountryLocation: false }
    }
  }
})

export const {
  setGeoCountryLocation,
  resetLocation
} = locationSlice.actions

export default locationSlice.reducer
