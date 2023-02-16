import React from 'react'
import Categories from '../components/Categories/Categories'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort/Sort'

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

   // Запрос для загрузки пицц с сервера
   React.useEffect(() => {

      fetch(`https://63e1085559bb472a742f0ab0.mockapi.io/items?${indexSort > 0 ? `category=${indexSort}` : ''}
      &sortBy=${changeSort.sortProperty}&order=desc`)
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
               [...new Array(8)].map((_, i) => <Skeleton key={i} />)
               : getFetch.map((obj) =>
                  <PizzaBlock
                     key={obj.id}
                     imageUrl={obj.imageUrl}
                     title={obj.title}
                     price={obj.price}
                     types={obj.types}
                     sizes={obj.sizes}
                  />
               )
            }
         </div>
      </div>

   )
}

export default Home