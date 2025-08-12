import { useContext } from 'react';

import { MealsContext } from '../src/store/meals-context';

export default function MainHeader({ count, openModal }) {
  const { selectedMeals } = useContext(MealsContext);

  const mealsCount = selectedMeals.length;

  return (
    <header id='main-header'>
      <div id='title'>
        <img src='../src/assets/logo.jpg' alt='Reactfood logo' />
        <h1>Reactfood</h1>
      </div>
      <div>
        <button id='cart-btn' onClick={openModal}>
          Cart <span>({mealsCount})</span>
        </button>
      </div>
    </header>
  );
}
