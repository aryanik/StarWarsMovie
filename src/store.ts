import { configureStore } from '@reduxjs/toolkit'
import { filmsApi } from './services/filmsApi'
import sortReducer from './store/slices/sortSlice'


export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    sort: sortReducer
  },
  middleware: (getDefault) =>
    getDefault().concat(filmsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch