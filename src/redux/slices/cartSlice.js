import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   items: [],
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         //Логика чтобы в корзину не добавлялись пиццы с одинаковыми id
         // Нахожу пиццу с id аналогично переданной
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

      }
   }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;