import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   items: [],
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setGetFetch: (state, action) => {
         state.items = action.payload
      }
   }
});

export const { setGetFetch } = pizzaSlice.actions;
export default pizzaSlice.reducer;