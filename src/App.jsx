import MainHeader from '../components/MainHeader';
import Meals from '../components/Meals';

function App() {
  return (
    <>
      <MainHeader />;
      <Meals availableMeals={[{ name: 'Pizza' }, { name: 'Nachos' }]} />
    </>
  );
}

export default App;
