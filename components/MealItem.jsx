export default function MealItem({ mealItem }) {
  return (
    <div className='meal-item'>
      <article>
        <div>
          <img src={`http://localhost:3000/${mealItem.image}`} alt='meal' />
        </div>
        <h3>{mealItem.name}</h3>
        <div>
          <span className='meal-item-price'>${mealItem.price}</span>
        </div>
        <p className='meal-item-description'>{mealItem.description}</p>
        <div className='meal-item-actions'>
          <button
            className='button'
            onClick={() => console.log(`Add to Cart: ${mealItem.name}`)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
