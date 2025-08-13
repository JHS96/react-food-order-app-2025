import { createContext, useState, useEffect, useRef } from 'react';

export const MealsContext = createContext({
  availableMeals: [],
});

export default function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    async function getAvailableMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals');
        const fetchedAvailableMeals = await response.json();

        if (!response.ok) return 'Something went wrong...';

        setAvailableMeals(fetchedAvailableMeals);
      } catch (err) {
        return { message: err.message };
      }
    }

    getAvailableMeals();
  }, []);

  const totalPrice = useRef(0);
  const orderPrice = totalPrice.current;
  useEffect(() => {
    for (const item of selectedMeals) {
      totalPrice.current += Number(item.price);
    }
  }, [selectedMeals]);

  function addOrRemoveMealItem(mealItem, action) {
    const mealIdx = selectedMeals.findIndex((item) => item.id === mealItem.id);

    if (!mealItem.count) {
      mealItem.count = 0;
    }

    if (action === 'add') {
      mealItem.count++;

      if (mealItem.count > 1) {
        const selectedMealsCopy = [...selectedMeals];
        selectedMealsCopy[mealIdx] = mealItem;
        setSelectedMeals(selectedMealsCopy);
      } else {
        setSelectedMeals((prevAddedMealItems) => [
          ...prevAddedMealItems,
          mealItem,
        ]);
      }
    }
    if (action === 'remove') {
      // ... remove meal item
    }
  }

  const ctxValue = {
    availableMeals,
    addOrRemoveMealItem,
    selectedMeals,
    orderPrice,
  };

  return (
    <MealsContext.Provider value={ctxValue}>{children}</MealsContext.Provider>
  );
}
