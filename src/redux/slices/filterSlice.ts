import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum SortPropertyEnum {
   RATING_DESC = 'rating',
   RATING_ASC = '-rating',
   TITLE_DESC = 'title',
   TITLE_ASC = '-title',
   PRICE_DESC = 'price',
   PRICE_ASC = '-price',
 }

export type SortType = {
   name: string;
   sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
   indexSort: number;
   changeSort: SortType,
   currentPage: number;
   searchValue: string;
};

const initialState: FilterSliceState = {
   indexSort: 0,
   changeSort: {
      name: 'популярности',
      sortProperty: SortPropertyEnum.RATING_DESC
   },
   currentPage: 1,
   searchValue: (''),
}

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setIndexSort: (state, action: PayloadAction<number>) => {
         state.indexSort = action.payload
         // console.log(state)
      },
      setChangeSort: (state, action: PayloadAction<SortType>) => {
         state.changeSort = action.payload
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
         state.currentPage = action.payload
      },
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      },
   }
});

export const { setIndexSort, setChangeSort, setCurrentPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;