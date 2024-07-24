import { createSlice, configureStore } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'RootState',
  initialState: {
    value: {
      theme: 'light'
    }
  },
  reducers: {
    setRootState: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { setRootState } = userSlice.actions

export const store = configureStore({
  reducer: userSlice.reducer,
})