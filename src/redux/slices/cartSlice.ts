import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from './../../utils/getCartFromLocalStorage';

// Типизирую item для дальнейшей передачи в стэйт 
export type CartItem = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   type: string;
   size: number;
   count: number;
};

// Типизирую стэйт
interface CartSliceState {
   items: CartItem[],
   totalPrice: number,
};

const cartData = getCartFromLocalStorage();

const initialState: CartSliceState = {
   items: cartData.items,
   totalPrice: cartData.totalPrice,
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
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
         state.totalPrice = calcTotalPrice(state.items)
         // state.totalPrice = state.items.reduce((sum, item) => {
         //    return sum + (item.count * item.price)
         // }, 0)

      },
      minusItem: (state, action: PayloadAction<string>) => {
         const findItem = state.items.find((obj) => obj.id === action.payload)
         if (findItem) {
            findItem.count--
         }
         state.totalPrice = calcTotalPrice(state.items)
      },
      removeItem: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter((obj) => obj.id !== action.payload)
         state.totalPrice = calcTotalPrice(state.items)
      },
      clearItem: (state) => {
         state.items = []
         state.totalPrice = 0
      },
   }
});

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;