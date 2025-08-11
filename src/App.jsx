import { useRef } from 'react';

import MainHeader from '../components/MainHeader';
import Meals from '../components/Meals';
import MealsContextProvider from './store/meals-context';
import Modal from '../components/Modal';

function App() {
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <MealsContextProvider>
        <MainHeader openModal={handleOpenModal} />;
        <Modal ref={modal} />
        <Meals />
      </MealsContextProvider>
    </>
  );
}

export default App;
