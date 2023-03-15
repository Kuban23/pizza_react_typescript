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

const Home = () => {
   
   // Состояние лоадинга пицц, для скелетона
   // const [isLoading, setIsLoading] = React.useState(true)

   // Состояние запроса на сервер, запрашиваю массив пицц
   //const [getFetch, setGetFetch] = React.useState([])

   // Состояние категории индекса типа сортировки пицц
   //const [indexSort, setIndexSort] = React.useState(0);

   // Состояние сортировки пицц
   // const [changeSort, setChangeSort] = React.useState(
   //    { name: 'популярности', sortProperty: 'rating' }
   // );

   // Состояние страниц для пагинации (mockapi не может давать данные сколько страниц осталось) 
   // поэтому захардкожим кол-во страниц
   // const [currentPage, setCurrentPage] = React.useState(1);

   // Контекст состояния инпута пицц
 // const { searchValue } = React.useContext(SearchContext);

   // Вытаскиваю состяние категорий пицц из редакса слайса
   const { indexSort, changeSort, currentPage } = useSelector((state) => state.filter);
   const getFetch = useSelector((state) => state.pizza.items);
   const status = useSelector((state) => state.pizza.status);
   const searchValue = useSelector((state)=>state.filter.searchValue);
   const dispatch = useDispatch();


   // Запрос на БЭК
   const getPizza = async () => {

      dispatch(fetchPizza({
         indexSort,
         changeSort,
         searchValue,
         currentPage
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
      .map((obj) =>
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
   const onChangeCategory = (i) => {
      dispatch(setIndexSort(i))
   }

   // Функция пагинации, заменил setCurrentPage
   const onChangePage = (nomberPage) => {
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