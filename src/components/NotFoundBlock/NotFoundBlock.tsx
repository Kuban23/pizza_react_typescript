import React from 'react'
import { Link } from 'react-router-dom';

import classes from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
   return (

      <div className={classes.root}>
         <h1>
            <span>😕</span>
            <br />
            Ничего не найдено.
         </h1>
         <p className={classes.description}>Данная страница отсутствует в нашем магазине </p>
         <Link to="/" className="button button--black">
               <span>Вернуться назад</span>
            </Link>
      </div>


   )
}

export default NotFoundBlock