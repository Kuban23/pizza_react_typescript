import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
 return  items.reduce((sum, item) => {
      return sum + (item.count * item.price)
   }, 0)
};

