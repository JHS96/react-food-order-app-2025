import MainHeader from '../components/MainHeader';
import Meals from '../components/Meals';
import MealsContextProvider from './store/meals-context';

function App() {
  return (
    <>
      <MealsContextProvider>
        <MainHeader />;
        <Meals />
      </MealsContextProvider>
    </>
  );
}

export default App;
