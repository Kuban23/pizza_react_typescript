import React from 'react';


// Типизирую пропсы
type CategoriesProps = {
   indexSort: number;
   setIndexSort: any;
};

const Categories: React.FC<CategoriesProps> = ({ indexSort, setIndexSort }) => {

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
               <li onClick={() => setIndexSort(i)} className={indexSort === i ? 'active' : ''} key={item}>{item}</li>
            )
            }

         </ul>
      </div>
   )
}

export default Categories