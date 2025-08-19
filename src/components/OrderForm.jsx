import { useActionState, useContext } from 'react';

import {
  isEmail,
  isEmpty,
  hasMinLength,
  isNumber,
} from '../util/validation.js';
import { MealsContext } from '../store/meals-context.jsx';

export default function OrderForm({ orderTotal, setModalMode }) {
  // args for useActionState hook: 1st => actionFn to be executed, then 2nd => initial state for in case the actionFn has not been executed yet
  // useActionState returns an array with 3 items (3rd to be added later here)
  // 1st => formState = the state of the form
  // 2nd => formAction = enhanced form of actionFn (orderAction in this case)
  // 3rd => isPending = not yet used here
  const [formState, formAction] = useActionState(orderAction, {
    errors: null,
  });
  const { submitOrder, selectedMeals } = useContext(MealsContext);

  // formData is automatically passed to the function similar to "event"
  // prevFormState is not needed here, but must be accepted as 1st arg to prevent error. formData must
  // the 2nd arg when using the useActionState hook
  function orderAction(prevFormState, formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const street = formData.get('street').trim();
    const postalCode = formData.get('postal-code').trim();
    const city = formData.get('city').trim();

    let errors = {};

    if (isEmpty(name) || !hasMinLength(name, 1)) {
      errors.name = 'Your full name must be at least 1 character.';
    }

    if (!isEmail(email) || isEmpty(email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!hasMinLength(street, 2)) {
      errors.street = 'Your street name must be at least 2 characters.';
    }

    if (!hasMinLength(postalCode, 4) || !isNumber(postalCode)) {
      errors.postalCode = 'Please enter a valid postal code.';
    }

    if (!hasMinLength(city, 2)) {
      errors.city = 'Your city name must be at least 2 characters.';
    }

    const errorsLength = Object.keys(errors).length;

    if (errorsLength > 0) {
      return {
        errors,
        enteredValues: {
          name,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    // Make sure that the arg to this fn is correctly structred or else the weakly written backend may crash
    submitOrder({
      order: {
        items: selectedMeals,
        customer: {
          name,
          email,
          street,
          'postal-code': postalCode,
          city,
        },
      },
    });

    return { errors: null };

    // close form after valid submission
    // clear state in context after valid submission
  }

  function handleGoBack() {
    setModalMode('cart');
  }

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: ${Math.max(0, orderTotal).toFixed(2)}</p>
      {/* formAction must be passed to action here as react uses it to wrap/enhance the developer defined orderAction */}
      <form action={formAction} noValidate>
        <div className='inputs'>
          <div className='control'>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              name='name'
              id='name'
              defaultValue={formState.enteredValues?.name}
            />
            {formState.errors?.name && (
              <p className='error'>{formState.errors.name}</p>
            )}
          </div>
          <div className='control'>
            <label htmlFor='email'>E-Mail Address</label>
            <input
              type='email'
              name='email'
              id='email'
              defaultValue={formState.enteredValues?.email}
            />
            {formState.errors?.email && (
              <p className='error'>{formState.errors.email}</p>
            )}
          </div>
          <div className='control'>
            <label htmlFor='street'>Street</label>
            <input
              type='text'
              name='street'
              id='street'
              defaultValue={formState.enteredValues?.street}
            />
            {formState.errors?.street && (
              <p className='error'>{formState.errors.street}</p>
            )}
          </div>
          <div className='control-row'>
            <div className='control'>
              <label htmlFor='postal-code'>Postal Code</label>
              <input
                type='number'
                name='postal-code'
                id='postal-code'
                defaultValue={formState.enteredValues?.postalCode}
              />
              {formState.errors?.postalCode && (
                <p className='error'> {formState.errors.postalCode}</p>
              )}
            </div>
            <div className='control'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                defaultValue={formState.enteredValues?.city}
              />
              {formState.errors?.city && (
                <p className='error'>{formState.errors.city}</p>
              )}
            </div>
          </div>
        </div>
        <div className='modal-actions'>
          <button type='reset' className='text-button' onClick={handleGoBack}>
            Go Back
          </button>
          <button className='button'>Submit Order</button>
        </div>
      </form>
    </>
  );
}
