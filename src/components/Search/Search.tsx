import React from 'react';
//@ts-ignore
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import classes from './Search.module.scss';
// import { SearchContext } from '../../context';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {

   // const { setSearchValue } = React.useContext(SearchContext);
   const dispatch = useDispatch();

   // Локальный стэйт для управляемого инпута
   const [value, setValue] = React.useState('');

   // Получаю ссылку на DOM элемент
   const inputRef = React.useRef<HTMLInputElement>(null);

   // Функция по очистке инпута и фокусировке курсора на input
   const onClickClear = () => {
      dispatch(setSearchValue(''));
      setValue('');
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }

   // Функция для изменения состояния поиска в input, воспользовался useCallback чтобы при монтировании компоненты функция заомнила состояние
   // при каждом изменении value будет отрабатывать setSearchValue с задержкой отправки запроса на сервер в 250 мсек.
   const onChangeSearchValue = React.useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
         // console.log('задержка')
      }, 250
      ), []
   );

   // Функция для управляемого инпута
   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChangeSearchValue(event.target.value);
   }

   return (
      <div className={classes.root}>
         <svg
            className={classes.icon}
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <path
               d="M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z"
               fill="#212121"
            />
         </svg>
         <input
            ref={inputRef}
            onChange={onChangeInput}
            value={value}
            className={classes.input}
            placeholder="Поиск пицц..."
            type="text"
         />
         <svg
            onClick={onClickClear}
            className={classes.clearIcon}
            data-name="Capa 1"
            id="Capa_1"
            viewBox="0 0 20 19.84"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
         </svg>
      </div>
   );
};

export default Search;
