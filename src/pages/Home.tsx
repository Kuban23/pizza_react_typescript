import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort/Sort'
//import { SearchContext } from '../context';
import { setIndexSort, setCurrentPage } from '../redux/slices/filterSlice'
import { fetchPizza } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store'

const Home: React.FC = () => {

   // Вытаскиваю состяние категорий пицц из редакса слайса
   const { indexSort, changeSort, currentPage } = useSelector((state: RootState) => state.filter);
   const getFetch = useSelector((state: RootState) => state.pizza.items);
   const status = useSelector((state: RootState) => state.pizza.status);
   const searchValue = useSelector((state: RootState) => state.filter.searchValue);
   const dispatch = useAppDispatch();

   // Запрос на БЭК
   const getPizza = async () => {
      const category = indexSort > 0 ? `category=${indexSort}` : '';
      const sortBy = changeSort.sortProperty.replace('-', '');
      const order = changeSort.sortProperty.includes('-') ? 'asc' : 'desc';
      const search = searchValue;


      dispatch(

         fetchPizza({
            category,
            sortBy,
            order,
            search,
            currentPage: String(currentPage)
         }))
   };


   // Отслеживаю запрос для загрузки пицц с сервера
   React.useEffect(() => {
      getPizza();
      window.scrollTo(0, 0)
   }, [indexSort, changeSort, searchValue, currentPage])

   // Вынес логику итерации скелетона и массива пицц в переменные
   const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
   const getPizzas = getFetch
      // .filter((item) => {
      //    if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
      //       return true;
      //    }
      //    return false;
      // })
      .map((obj: any) =>
         <PizzaBlock
            key={obj.id}
            imageUrl={obj.imageUrl}
            title={obj.title}
            price={obj.price}
            types={obj.types}
            sizes={obj.sizes}
            id={obj.id}
         />
      )

   // Функция по смене категорий пицц
   const onChangeCategory = (i: number) => {
      dispatch(setIndexSort(i))
   }

   // Функция пагинации, заменил setCurrentPage
   const onChangePage = (nomberPage: number) => {
      dispatch(setCurrentPage(nomberPage))
   }

   return (

      <div className="container">

         <div className="content__top">
            <Categories
               indexSort={indexSort}
               setIndexSort={onChangeCategory}
            />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {/* Отрисовка пицц в случае ошибки и успеха */}
         {status === 'error' ? (
            <div className='content__error-info'>
               <h2>Произошла ошибка 😕</h2>
               <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
         ) : (
            //   Паказываю Скелетон или Пиццы 
            <div className="content__items">{status === 'loading' ? skeletons : getPizzas}</div>
         )}
         <Pagination
            onChangePage={onChangePage}
         />
      </div>

   )
}

export default Home