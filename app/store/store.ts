import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import orderReducer from './slices/orders.slice';
import searchReducer from './slices/search.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        search: searchReducer,
    },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;