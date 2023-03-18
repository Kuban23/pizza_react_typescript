import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './components/FullPizza/FullPizza';

function App() {

   //Состояние инпута поиска пицц
   //const [searchValue, setSearchValue] = React.useState('');

   return (
      <div className="wrapper">         
            <Header />
            <div className="content">
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/pizza/:id' element={<FullPizza/>}/>
                  <Route path='*' element={<NotFound />} />
               </Routes>             
            </div>

        

      </div>

   );
}

export default App;
