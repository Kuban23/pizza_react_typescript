import React from 'react';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
import itemsPizza from './assets/pizza.json';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {

   // Состояние лоадинга пицц
   const [isLoading, setIsLoading] = React.useState(false)

   return (
      <div className="wrapper">
         {/* Header */}
         <Header />
         <div className="content">
            <div className="container">
               <div className="content__top">
                  {/* категирии пицц */}
                  <Categories />
                  {/* сортировка */}
                  <Sort />
               </div>
               <h2 className="content__title">Все пиццы</h2>
               <div className="content__items">
                  {/* Блок пицц */}

                  {isLoading ?
                     [...new Array(8)].map((_, i) => <Skeleton key={i} />)
                     : itemsPizza.map((obj) =>
                        <PizzaBlock
                           key={obj}
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
         </div>
      </div>

   );
}

export default App;
