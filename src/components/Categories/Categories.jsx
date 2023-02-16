import React from 'react';

const Categories = ({indexSort, setIndexSort}) => {

   // // Состояние индекса выбора типа сортировки по категориям
   // const [indexSort, setIndexSort] = React.useState(0)

   // Создал массив категорий пицц
   const categorArray = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
   ];

   return (
      <div className="categories">
         <ul>

            {categorArray.map((item, i) =>
               <li onClick={()=>setIndexSort(i)} className={indexSort === i ? 'active' : ''} key={item}>{item}</li>
            )
            }
            
         </ul>
      </div>
   )
}

export default Categories