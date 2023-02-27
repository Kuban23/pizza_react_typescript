import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort/Sort'
import { SearchContext } from '../context';
import { setIndexSort } from '../redux/slices/filterSlice'

const Home = () => {

   // Состояние лоадинга пицц, для скелетона
   const [isLoading, setIsLoading] = React.useState(true)

   // Состояние запроса на сервер, запрашиваю массив пицц
   const [getFetch, setGetFetch] = React.useState([])

   // Состояние категории индекса типа сортировки пицц
   //const [indexSort, setIndexSort] = React.useState(0);

   // Состояние сортировки пицц
   // const [changeSort, setChangeSort] = React.useState(
   //    { name: 'популярности', sortProperty: 'rating' }
   // );

   // Состояние страниц для пагинации (mockapi не может давать данные сколько страниц осталось) 
   // поэтому захардкожим кол-во страниц
   const [currentPage, setCurrentPage] = React.useState(1);

   // Контекст состояния инпута пицц
   const { searchValue } = React.useContext(SearchContext);

   // Вытаскиваю состяние категорий пицц из редакса слайса
   const { indexSort, changeSort } = useSelector((state) => state.filter);
   const dispatch = useDispatch();

   // Запрос для загрузки пицц с сервера
   React.useEffect(() => {

      fetch(`https://63e1085559bb472a742f0ab0.mockapi.io/items?${indexSort > 0 ? `category=${indexSort}` : ''
         }&sortBy=${changeSort.sortProperty.replace('-', '')
         }&order=${changeSort.sortProperty.includes('-') ? 'asc' : 'desc'}&search=${searchValue}&page=${currentPage}&limit=4`)
         .then((res) => res.json())
         .then((data) => {
            // setGetFetch(data)
            // setIsLoading(false)
            setTimeout(() => {
               setGetFetch(data)
               setIsLoading(false)
            }, 300)
         })
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
         />
      )

   // Функция по смене категорий пицц
   const onChangeCategory = (i) => {
      dispatch(setIndexSort(i))
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
         <div className="content__items">

            {isLoading ?
               skeletons
               : getPizzas
            }
         </div>
         <Pagination
            onChangePage={(nomberPage) => setCurrentPage(nomberPage)}
         />
      </div>

   )
}

export default Home