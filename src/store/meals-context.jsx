import { createContext, useState, useEffect } from 'react';

export const MealsContext = createContext({
  availableMeals: [],
});

export default function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);

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

  const ctxValue = { availableMeals };

  return (
    <MealsContext.Provider value={ctxValue}>{children}</MealsContext.Provider>
  );
}
