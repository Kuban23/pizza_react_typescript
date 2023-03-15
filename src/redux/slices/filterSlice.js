import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   indexSort: 0,
   changeSort: {
      name: 'популярности',
      sortProperty: 'rating'
   },
   currentPage: 1,
   searchValue: (''),
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
      },
      setCurrentPage: (state, action) => {
         state.currentPage = action.payload
      },
      setSearchValue: (state, action) => {
         state.searchValue = action.payload
      },
   }
});

export const { setIndexSort, setChangeSort, setCurrentPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;