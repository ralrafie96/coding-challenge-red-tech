
import axios from 'axios';
import { store } from '../store';
import { clearOrder, getOrder, makeOrder } from '../reducers/order';
import { Order } from '../../models/order';

export const GetOrder = () => {
    store.dispatch(getOrder())
}

export const MakeOrder = (order: Order) => {
    store.dispatch(makeOrder({
        orderId: order.orderId,
        createdDate: order.createdDate,
        createdByUserName: order.createdByUserName,
        orderType: order.orderType,
        customerName: order.customerName,
    }))
}

export const ClearOrder = () => {
    store.dispatch(clearOrder())
}