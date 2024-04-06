import { createSlice } from '@reduxjs/toolkit';

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

const { setBillList } = billStore.actions;

const reducer = billStore.reducer;
export default reducer;
