import React from 'react'

import classes from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
   return (

      <div className={classes.root}>
         <h1>
            <span>:(</span>
            <br />
            Ничего не найдено, кликни по Логотипу...
         </h1>
         <p className={classes.description}>Данная страница отсутствует в нашем магазине </p>
      </div>


   )
}

export default NotFoundBlock