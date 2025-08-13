import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';

import { MealsContext } from '../src/store/meals-context';

export default forwardRef(function Modal(props, ref) {
  const dialog = useRef();
  const { selectedMeals, orderTotal } = useContext(MealsContext);

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
    dialog.current.close();
  }

  function handleAddOrRemoveMeal(identifier, meal) {
    if (identifier === 'add') {
      // +1 meal
      console.log('Add ' + meal.name);
    }
    if (identifier === 'remove') {
      // -1 meal
      console.log('Remove ' + meal.name);
    }
  }

  return createPortal(
    <dialog className='modal' ref={dialog}>
      <h2>Your Cart</h2>
      <div className='cart'>
        <ul>
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
        <p className='cart-total'>${orderTotal.toFixed(2)}</p>
      </div>
      <div className='modal-actions'>
        <button className='text-button' onClick={handleCloseModal}>
          Close
        </button>
        <button
          className='button'
          onClick={() => console.log('Go to checkout...')}
        >
          Go to Checkout
        </button>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});
