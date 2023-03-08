import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   items: [],
   totalPrice: 0,
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         //Логика чтобы в корзину не добавлялись пиццы с одинаковыми id
         // Нахожу пиццу с id аналогично переданным и добавляю счетчик
         const findItem = state.items.find((obj) => obj.id === action.payload.id)
         // Если нашел, то присваиваю счетчик и прибавляю +1 иначе добавляю новую пиццу
         if (findItem) {
            findItem.count++
         }
         else {
            state.items.push({
               ...action.payload,
               count: 1
            })
         }
         state.totalPrice = state.items.reduce((sum, item) => {
            return sum + (item.count * item.price)
         }, 0)

      },
      minusItem: (state, action) => {
         const findItem = state.items.find((obj) => obj.id === action.payload.id)
         if (findItem) {
            findItem.count--
         }
      },
      removeItem: (state, action) => {
         state.items = state.items.filter((obj) => obj.id !== action.payload)
      },
      clearItem: (state) => {
         state.items = []
         state.totalPrice = 0
      },
   }
});

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;