import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './pages/Home';
import Card from './pages/Card';
import NotFound from './pages/NotFound';
import { SearchContext } from './context';


function App() {

   //Состояние инпута поиска пицц
   const [searchValue, setSearchValue] = React.useState('');

   return (
      <div className="wrapper">
         <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />
            <div className="content">

               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/card' element={<Card />} />
                  <Route path='*' element={<NotFound />} />
               </Routes>

               {/* <Card/> 
            <NotFound/> */}

            </div>

         </SearchContext.Provider>

      </div>

   );
}

export default App;
