import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

type FetchPizzaArgs = {
   category: string;
   sortBy: string;
   order: string;
   search: string;
   currentPage: string;
};

// Реализация запроса на БЭК с помощью асинхронного экшена
export const fetchPizza = createAsyncThunk('pizza/fetchPizzaById', async (params: FetchPizzaArgs) => {
   const { category, sortBy, order, search, currentPage } = params;
   const res = await axios.get(`https://63e1085559bb472a742f0ab0.mockapi.io/items?${category}&sortBy=${sortBy}
   &order=${order}&search=${search}&page=${currentPage}&limit=4`)

   return res.data as Pizza[]
})

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   type: number;
   size: number;
   count: number;
};

enum Status {
   LOADING = 'loading',
   SACCESS = 'saccess',
   ERROR = 'error',
};

interface PizzaSliceState {
   items: Pizza[],
   status: Status
};

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING
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
   extraReducers: (builder) => {
      builder.addCase(fetchPizza.pending, (state, action) => {
         state.status = Status.LOADING;
         state.items = [];
      })
      builder.addCase(fetchPizza.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SACCESS;
      })
      builder.addCase(fetchPizza.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.items = [];
      })
   },
   // extraReducers: {
   //    [fetchPizza.pending]: (state) => {
   //       state.status = 'loading';
   //       state.items = [];
   //    },
   //    [fetchPizza.fulfilled]: (state, action) => {
   //       state.items = action.payload;
   //       state.status = 'saccess';
   //    },
   //    [fetchPizza.rejected]: (state) => {
   //       state.status = 'error';
   //       state.items = [];
   //    },
   // },

});

export const { setGetFetch } = pizzaSlice.actions;
export default pizzaSlice.reducer;