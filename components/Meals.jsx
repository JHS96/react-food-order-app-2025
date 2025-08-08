import MealItem from './MealItem';

export default function Meals({ availableMeals }) {
  return (
    <section id='meals'>
      {availableMeals &&
        availableMeals.map((mealItem) => {
          return <MealItem key={mealItem.name} name={mealItem.name} />;
        })}

      {!availableMeals && <p>No available meals...</p>}
    </section>
  );
}
