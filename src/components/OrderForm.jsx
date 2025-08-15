import {
  isEmail,
  isEmpty,
  hasMinLength,
  isNumber,
} from '../util/validation.js';

export default function OrderForm({ orderTotal, setModalMode }) {
  function handleGoBack() {
    setModalMode('cart');
  }

  function orderAction(formData) {
    const enteredName = formData.get('name');
    const enteredEmail = formData.get('email');
    const enteredStreet = formData.get('street');
    const enteredPostalCode = formData.get('postal-code');
    const enteredCity = formData.get('city');

    let errors = {};

    if (isEmpty(enteredName) || !hasMinLength(enteredName, 1)) {
      errors.name = 'Your full name must be at least 1 character.';
    }

    if (!isEmail(enteredEmail) || isEmpty(enteredEmail)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!hasMinLength(enteredStreet, 2)) {
      errors.street = 'Your street name must be at least 2 characters.';
    }

    if (!hasMinLength(enteredPostalCode, 4) || !isNumber(enteredPostalCode)) {
      errors.postalCode = 'Please enter a valid postal code.';
    }

    if (!hasMinLength(enteredCity, 2)) {
      errors.city = 'Your city name must be at least 2 characters.';
    }

    console.log(errors);

    // don't clear form if submit is attempted but form is invalid
    // submit form if valid
    // close form after valid submission
    // clear state in context after valid submission
  }

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: ${Math.max(0, orderTotal).toFixed(2)}</p>
      <form action={orderAction} noValidate>
        <div className='inputs'>
          <div className='control'>
            <label htmlFor='name'>Full Name</label>
            <input type='text' name='name' id='name' />
          </div>
          <div className='control'>
            <label htmlFor='email'>E-Mail Address</label>
            <input type='email' name='email' id='email' />
          </div>
          <div className='control'>
            <label htmlFor='street'>Street</label>
            <input type='text' name='street' id='street' />
          </div>
          <div className='control-row'>
            <div className='control'>
              <label htmlFor='postal-code'>Postal Code</label>
              <input type='number' name='postal-code' id='postal-code' />
            </div>
            <div className='control'>
              <label htmlFor='city'>City</label>
              <input type='text' name='city' id='city' />
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
