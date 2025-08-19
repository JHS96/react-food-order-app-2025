import { createContext, useState, useEffect } from 'react';

export const MealsContext = createContext({
  availableMeals: [],
  addOrRemoveMealItem: (mealItem, action) => {},
  submitOrder: () => {},
  resetOrderCtx: () => {},
  selectedMeals: [],
  orderTotal: 0,
});

export default function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

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

      setOrderTotal((prevTotal) => prevTotal + Number(mealItem.price));
    }
    if (action === 'remove') {
      mealItem.count--;

      if (mealItem.count <= 0) {
        const updatedSelectedMeals = selectedMeals.filter(
          (item) => item.id !== mealItem.id
        );
        setSelectedMeals(updatedSelectedMeals);
      }

      setOrderTotal((prevOrderTotal) => prevOrderTotal - mealItem.price);
    }
  }

  async function submitOrder(order) {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        return { error: { message: 'Something went wrong...' } };
      }
    } catch (err) {
      console.log(err);
    }
  }

  function resetOrderCtx() {
    setSelectedMeals([]);
    setOrderTotal(0);
  }

  const ctxValue = {
    availableMeals,
    addOrRemoveMealItem,
    submitOrder,
    resetOrderCtx,
    selectedMeals,
    orderTotal,
  };

  return (
    <MealsContext.Provider value={ctxValue}>{children}</MealsContext.Provider>
  );
}
