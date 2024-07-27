import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './reducers/order'
export const store = configureStore({
  reducer: {
    order: orderReducer,
  }
})