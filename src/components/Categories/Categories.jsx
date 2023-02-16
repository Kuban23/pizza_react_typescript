import React from 'react';

const Categories = ({indexSort, setIndexSort}) => {

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