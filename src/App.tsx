import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './components/FullPizza/FullPizza';
import MainLayout from './layout/MainLayout';

function App() {

   return (
      <Routes>
         {/* Оборачиваю роуты родителем чтобы Header был на своем месте при переходе на другие страницы */}
         <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='pizza/:id' element={<FullPizza />} />
            <Route path='*' element={<NotFound />} />
         </Route>

      </Routes>
   );
}

export default App;
