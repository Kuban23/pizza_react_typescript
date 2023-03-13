import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


// Реализация запроса на БЭК с помощью асинхронного экшена
export const fetchPizza = createAsyncThunk('pizza/fetchPizzaById', async (params) => {
   const { indexSort, changeSort, searchValue, currentPage } = params;
   const res = await axios.get(`https://63e1085559bb472a742f0ab0.mockapi.io/items?${indexSort > 0 ? `category=${indexSort}` : ''
      }&sortBy=${changeSort.sortProperty.replace('-', '')
      }&order=${changeSort.sortProperty.includes('-') ? 'asc' : 'desc'}&search=${searchValue}&page=${currentPage}&limit=4`)

   return res.data
})

const initialState = {
   items: [],
   status: 'isLoadind'
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setGetFetch: (state, action) => {
         state.items = action.payload
      }
   },

   // отображение пицц на страницы и отрисовака статуса
   extraReducers: {
      [fetchPizza.pending]: (state) => {
         state.status = 'loading';
         state.items = [];
      },
      [fetchPizza.fulfilled]: (state, action) => {
         state.items = action.payload;
         state.status = 'saccess';
      },
      [fetchPizza.rejected]: (state) => {
         state.status = 'error';
         state.items = [];
      },
   },

});

export const { setGetFetch } = pizzaSlice.actions;
export default pizzaSlice.reducer;