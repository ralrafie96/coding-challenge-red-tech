import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderId: '',
    createdDate: '',
    createdByUserName: '',
    orderType: '',
    customerName: '',
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        getOrder(state) {
            return {
                ...state
            }
        },
        makeOrder(state, action) {
            return {
                ...state,
                orderId: action.payload.orderId,
                createdDate: action.payload.createdDate,
                createdByUserName: action.payload.createdByUserName,
                orderType: action.payload.orderType,
                customerName: action.payload.customerName,
            }
        },
        clearOrder(state) {
            return {
                ...state,
                orderId: initialState.orderId,
                createdDate: initialState.createdDate,
                createdByUserName: initialState.createdByUserName,
                orderType: initialState.orderType,
                customerName: initialState.customerName,
            }
        }
    }
})

export const { getOrder, makeOrder, clearOrder } = orderSlice.actions
export default orderSlice.reducer
