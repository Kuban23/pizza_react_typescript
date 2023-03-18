import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

const FullPizza = () => {

   // Состояние пиццы
   const [pizza, setPizza] = React.useState();


   // Воспользовался Хуком useParams чтобы вытащить путь
   const params = useParams();
   //console.log(params)

   // При отрисовке компанента делаю запрос на БЭК и получаю запрашиваему пиццу
   React.useEffect(() => {
      async function fetchPizza() {
         const res = await axios.get('https://63e1085559bb472a742f0ab0.mockapi.io/items/' + params.id)
         // console.log(res)
         setPizza(res.data);
      }
      fetchPizza()
   }, []);

   // В состоянии у меня пусто, поэтому пока идет запрос нужно сделать условие
   if (!pizza) {
      return 'Идет загрузка пиццы..'
   }

   return (
      <div className="pizza-block-container">
         <div className="pizza-block">
            <h4 className="pizza-block__title">{pizza.title}</h4>
            <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
            <div className="pizza-block__price">от {pizza.price} ₽</div>
         </div>
      </div>
   )
}

export default FullPizza;