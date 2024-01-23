import axios from 'axios';
import { ApiQueryParamsOrders, Job } from '../constatnts/types';
import orders from '../data/orders.data';
import $api from './instance';


const getOrders = async (params: ApiQueryParamsOrders) => {
    // const response = await $api.get(`http://51.250.93.99:7777/orders`, {
    //     params,
    // });
    // return response.data;

    try {
        const response = await axios.get(`http://51.250.93.99:7777/orders`, {
            params,
        });
        
        if (response.status === 200) {
        } else {
          console.warn('21 Unexpected status code:', response.status);
        }
        return response.data
      } catch (error: any) {
        console.error('API Error:', error.message);
      }
};

const deleteOrder = async (id: string) => {
    const response = await $api.delete(`/users-api/orders/${id}`);
    return response.data;
};

const orderResponseFromUser = async (id: string) => {
    const response = await $api.put(`/users-api/Orders/${id}/responses`);
    return response.data;
};

const deleteOrderResponseFromUser = async (id: string) => {
    const response = await $api.delete(`/users-api/Orders/${id}/responses`);
    return response.data;
};

const orderResponseForUser = async ({
    orderId,
    responseId,
    isApprove,
}: {
    orderId: string;
    responseId: string;
    isApprove: boolean;
}) => {
    const answer = isApprove ? 'approve' : 'reject';
    const response = await $api.put(
        `/users-api/Orders/${orderId}/responses/${responseId}/${answer}`,
    );
    return response.data;
};

const getOrderItem = async (id: string) => {
    const response = await axios.get(`http://51.250.93.99:7777/orders/${id}`);
    return response.data;
};

const OrdersService = {
    getOrders,
    getOrderItem,
    orderResponseFromUser,
    deleteOrder,
    orderResponseForUser,
    deleteOrderResponseFromUser,
};

export default OrdersService;
