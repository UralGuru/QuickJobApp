import { ApiQueryParamsOrders } from '@/app/constatnts/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SEARCH_STATE: ApiQueryParamsOrders = {
    take: 100,
};

const myApiParamsSlice = createSlice({
    name: 'search',
    initialState: SEARCH_STATE,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setTagsList: (state, action: PayloadAction<string>) => {
            state.tagsList = action.payload;
        },
        setPaymentType: (
            state,
            action: PayloadAction<'Cash' | 'Card' | 'Other'>,
        ) => {
            state.paymentType = action.payload;
        },
        setStartDateTimeAfter: (state, action: PayloadAction<string>) => {
            state.startDateTimeAfter = action.payload;
        },
        setEndDateTimeBefore: (state, action: PayloadAction<string>) => {
            state.endDateTimeBefore = action.payload;
        },
        setSortField: (
            state,
            action: PayloadAction<
                | 'CreateDateTime'
                | 'EditDateTime'
                | 'WorkHours'
                | 'Limit'
                | 'ApprovedResponsesCount'
                | 'Price'
            >,
        ) => {
            state.sortField = action.payload;
        },
        setSortDirection: (
            state,
            action: PayloadAction<'Ascending' | 'Descending'>,
        ) => {
            state.sortDirection = action.payload;
        },
        setTake: (state, action: PayloadAction<number>) => {
            state.take = action.payload;
        },
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        },
    },
});

export const {
    setQuery,
    setTagsList,
    setPaymentType,
    setStartDateTimeAfter,
    setEndDateTimeBefore,
    setSortField,
    setSortDirection,
    setTake,
    setSkip,
} = myApiParamsSlice.actions;

export default myApiParamsSlice.reducer;
