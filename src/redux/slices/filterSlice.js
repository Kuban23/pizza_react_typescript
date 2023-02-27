import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   indexSort: 0,
   changeSort: {
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
      },
      setChangeSort: (state, action) => {
         state.changeSort = action.payload         
      }
   }
});

export const { setIndexSort, setChangeSort } = filterSlice.actions;
export default filterSlice.reducer;