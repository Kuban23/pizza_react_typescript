import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   indexSort: 0,
   sort: {
      name: 'популярности',
      sortProperty: 'rating'
   }
}

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setIndexSort: (state, action) => {
         state.indexSort = action.payload
         // console.log(state)
      }
   }
});

export const { setIndexSort } = filterSlice.actions;
export default filterSlice.reducer;