import React from 'react'
import { useEffect } from 'react';
import { RootState } from '../../redux/store';

import { useDispatch, useSelector } from 'react-redux';
import { setChangeSort} from '../../redux/slices/filterSlice';


type SortItem = {
   name: string;
   sortProperty: string;
};

const sortArray: SortItem[] = [
   { name: 'популярности (DESC)', sortProperty: 'rating' },
   { name: 'популярности (ASC)', sortProperty: '-rating' },
   { name: 'цене (DESC)', sortProperty: 'price' },
   { name: 'цене (ASC)', sortProperty: '-price' },
   { name: 'алфавиту (DESC)', sortProperty: 'title' },
   { name: 'алфавиту (ASC)', sortProperty: '-title' },
];

const Sort = () => {

   // Состояние видимости попапа сортировки
   const [isVisible, setIsVisible] = React.useState(false)

   // Вытаскиваю состояние из redux
   const changeSort = useSelector((state: RootState) => state.filter.changeSort);
   const dispatch = useDispatch();

   // Получаю ссылку на div элемент с классом sort
   const sortRef = React.useRef<HTMLDivElement>(null);

   const selectSort = (i: SortItem) => {
      dispatch(setChangeSort(i));
      setIsVisible(false);
   }

   // Функция закрытия popup, отработка клика по body и нажатие клавиши Esc. 
   const onClickClosePopup = (event: MouseEvent) => {
      // if (!event.path.includes(sortRef.current) || event.key === 'Escape')
      const _event = event as MouseEvent & {
         path: Node[]
         key: string
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
         //console.log("клик")
         setIsVisible(false);
      }
   }

   // Функция закрытия popup, по нажатии клавиши Esc.
   const onKeydownClosePopup = (event: KeyboardEvent) => {
      // if (!event.path.includes(sortRef.current) || event.key === 'Escape')
      const _event = event as KeyboardEvent & {
         key: string
      }
      if (_event.key === 'Escape') {
         //console.log("клик")
         setIsVisible(false);
      }
   }

   // Отслеживаю клик и клавишу Esc.
   useEffect(() => {
      document.body.addEventListener('click', onClickClosePopup)
      document.body.addEventListener('keydown', onKeydownClosePopup)
      return () => {
         document.body.removeEventListener('click', onClickClosePopup)
         document.body.removeEventListener('keydown', onKeydownClosePopup)
      }
   }, [])

   return (
      <div className="sort" ref={sortRef}>
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={() => setIsVisible(!isVisible)}>{changeSort.name}</span>
         </div>
         {isVisible &&
            <div className="sort__popup">
               <ul>
                  {sortArray.map((obj, i) =>
                     <li onClick={() => selectSort(obj)} className={changeSort.sortProperty === obj.sortProperty ? 'active' : ''}
                        key={i}>{obj.name}</li>
                  )
                  }
               </ul>
            </div>
         }
      </div>
   )
}

export default Sort