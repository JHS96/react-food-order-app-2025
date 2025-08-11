import { useContext } from 'react';

import MealItem from './MealItem';
import { MealsContext } from '../src/store/meals-context';

export default function Meals() {
  const { availableMeals } = useContext(MealsContext);

  return (
    <section id='meals'>
      {availableMeals &&
        availableMeals.map((mealItem) => {
          return <MealItem key={mealItem.id} mealItem={mealItem} />;
        })}

      {!availableMeals && <p>No available meals...</p>}
    </section>
  );
}
