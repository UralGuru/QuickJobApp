import { ApiQueryParamsOrders, FoundItemOrder, FrontObject, Job, UserInfo } from '@/app/constatnts/types';
import AuthService from '@/app/services/auth.service';
import OrdersService from '@/app/services/orders.service';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ORDERS_STATE: FrontObject = {
    foundItems: [],
    totalCount: 0,
};
export const getOrdersThunk = createAsyncThunk(
    'orders/getOrders',
    async function (_, { rejectWithValue, getState }) {
        try {
            const { search } = getState() as { search: ApiQueryParamsOrders };
            const response = await OrdersService.getOrders(search);
            return response as FrontObject;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    },
);
export const getOrderItemThunk = createAsyncThunk(
    'orders/getOrderItem',
    async function (id: string, { rejectWithValue, getState }) {
        try {
            const response = await OrdersService.getOrderItem(id);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const deleteOrderItemThunk = createAsyncThunk(
    'orders/deleteOrderItem',
    async function (id: string, { rejectWithValue, getState }) {
        try {
            const response = await OrdersService.deleteOrder(id);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const getUserThunk = createAsyncThunk(
    'orders/getUser',
    async function (id: string, { rejectWithValue }) {
        try {
            return await AuthService.getUser(id);
        } catch {
            return rejectWithValue('Server error!');
        }
    },
);

export const orderResponseFromUserThunk = createAsyncThunk(
    'orders/orderResponseFrom',
    async function (id: string, { rejectWithValue }) {
        try {
            return await OrdersService.orderResponseFromUser(id);
        } catch {
            return rejectWithValue('Server error!');
        }
    },
);

export const deleteOrderResponseFromUserThunk = createAsyncThunk(
    'orders/deleteOrderResponseFrom',
    async function (id: string, { rejectWithValue }) {
        try {
            return await OrdersService.deleteOrderResponseFromUser(id);
        } catch {
            return rejectWithValue('Server error!');
        }
    },
);

export const orderResponseForUserThunk = createAsyncThunk(
    'orders/orderResponseFor',
    async function (
        data: {
            orderId: string;
            responseId: string;
            isApprove: boolean;
        },
        { rejectWithValue },
    ) {
        try {
            return await OrdersService.orderResponseForUser(data);
        } catch {
            return rejectWithValue('Server error!');
        }
    },
);

const newsSlice = createSlice({
    name: 'orders',
    initialState: ORDERS_STATE,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.foundItems = action.payload.foundItems;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(getOrdersThunk.pending, (state, action) => {
                state.foundItems = [];
                state.totalCount = 0;
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {
                console.error('Error fetching orders:', action.error);
            })
            .addCase(getOrderItemThunk.fulfilled, (state, action) => {
                state.item = action.payload;
            })
            .addCase(getOrderItemThunk.pending, (state, action) => {
                state.item = {} as FoundItemOrder;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.item.customerInfo = action.payload;
            })
            .addCase(getUserThunk.pending, (state, action) => {
                state.item.customerInfo = {} as UserInfo;
            })
            .addCase(
                orderResponseFromUserThunk.fulfilled,
                (state, action) => {},
            )
            .addCase(orderResponseFromUserThunk.pending, (state, action) => {
                state.error = '';
            })
            // .addCase(orderResponseFromUserThunk.rejected, (state, action) => {
            //     state.error = action.error;
            // })
            .addCase(deleteOrderItemThunk.fulfilled, (state, action) => {
                state.error = '';
            });
    },
});

export const {} = newsSlice.actions;
export default newsSlice.reducer;
