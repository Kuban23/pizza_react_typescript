import React from 'react'
import Categories from '../components/Categories/Categories'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort/Sort'
import { SearchContext } from '../context';

const Home = () => {

   // Состояние лоадинга пицц, для скелетона
   const [isLoading, setIsLoading] = React.useState(true)

   // Состояние запроса на сервер, запрашиваю массив пицц
   const [getFetch, setGetFetch] = React.useState([])

   // Состояние категории индекса типа сортировки пицц
   const [indexSort, setIndexSort] = React.useState(0);

   // Соятояние сортировки пицц
   const [changeSort, setChangeSort] = React.useState(
      { name: 'популярности', sortProperty: 'rating' }
   );

   // Контекст состяония инпута пицц
   const { searchValue } = React.useContext(SearchContext);


   // Запрос для загрузки пицц с сервера
   React.useEffect(() => {

      fetch(`https://63e1085559bb472a742f0ab0.mockapi.io/items?${indexSort > 0 ? `category=${indexSort}` : ''
         }&sortBy=${changeSort.sortProperty.replace('-', '')
         }&order=${changeSort.sortProperty.includes('-') ? 'asc' : 'desc'}`)
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
   }, [indexSort, changeSort])


   // Вынес логику итерации скелетона и массива пицц в переменные
   const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
   const getPizzas = getFetch.filter((item) => {
      if (item.title.includes(searchValue)) {
         return true;
      }
      return false;
   }).map((obj) =>
      <PizzaBlock
         key={obj.id}
         imageUrl={obj.imageUrl}
         title={obj.title}
         price={obj.price}
         types={obj.types}
         sizes={obj.sizes}
      />
   )

   return (

      <div className="container">

         <div className="content__top">
            <Categories
               indexSort={indexSort}
               setIndexSort={setIndexSort}
            />
            <Sort
               changeSort={changeSort}
               setChangeSort={setChangeSort}
            />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">

            {isLoading ?
               skeletons
               : getPizzas
            }
         </div>
      </div>

   )
}

export default Home