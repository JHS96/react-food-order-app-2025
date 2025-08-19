import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { MealsContext } from '../store/meals-context.jsx';
import OrderForm from './OrderForm.jsx';

export default forwardRef(function Modal(props, ref) {
  const dialog = useRef();
  const { selectedMeals, orderTotal, addOrRemoveMealItem, resetOrderCtx } =
    useContext(MealsContext);
  const [modalMode, setModalMode] = useState('cart');

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  function handleCloseModal() {
    setModalMode('cart');
    dialog.current.close();
  }

  function handleAddOrRemoveMeal(action, meal) {
    addOrRemoveMealItem(meal, action);
  }

  function handleGoToCheckout() {
    if (selectedMeals.length) {
      setModalMode('checkout');
    }
  }

  function handleCloseModalClearOrder() {
    resetOrderCtx();
    handleCloseModal();
  }

  let modalContent = (
    <>
      <h2>Your Cart</h2>
      <div className='cart'>
        <ul>
          {!selectedMeals.length && 'Your cart is empty...'}
          {selectedMeals.length > 0 &&
            selectedMeals.map((meal) => {
              return (
                <li key={meal.id} className='cart-item'>
                  <p>
                    {meal.name} - {meal.count} x ${meal.price}
                  </p>
                  <div className='cart-item-actions'>
                    <button
                      onClick={() => handleAddOrRemoveMeal('remove', meal)}
                    >
                      -
                    </button>
                    <p>{meal.count}</p>
                    <button onClick={() => handleAddOrRemoveMeal('add', meal)}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
        <p className='cart-total'>${Math.max(0, orderTotal).toFixed(2)}</p>
      </div>
      <div className='modal-actions'>
        <button className='text-button' onClick={handleCloseModal}>
          Close
        </button>
        <button className='button' onClick={handleGoToCheckout}>
          Go to Checkout
        </button>
      </div>
    </>
  );

  if (modalMode === 'checkout') {
    modalContent = (
      <OrderForm orderTotal={orderTotal} setModalMode={setModalMode} />
    );
  }

  if (modalMode === 'success') {
    modalContent = (
      <>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className='modal-actions'>
          <button className='button' onClick={handleCloseModalClearOrder}>
            Okay
          </button>
        </div>
      </>
    );
  }

  return createPortal(
    <dialog className='modal' ref={dialog}>
      {modalContent}
    </dialog>,
    document.getElementById('modal')
  );
});
