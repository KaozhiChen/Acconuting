import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    //同步修改bill
    setBillList(state, action) {
      state.billList = action.payload;
    },
    //add bill list
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { setBillList, addBill } = billStore.actions;

//异步请求
const getBillList = () => {
  return async (dispatch) => {
    //异步请求
    const res = await axios.get('http://localhost:8888/ka');
    //触发同步reducer
    dispatch(setBillList(res.data));
  };
};

const addBillList = (data) => {
  return async (dispatch) => {
    //异步请求
    const res = await axios.post('http://localhost:8888/ka', data);
    //触发同步reducer
    dispatch(addBill(res.data));
  };
};

export { getBillList, addBillList };
const reducer = billStore.reducer;
export default reducer;
