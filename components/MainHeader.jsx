export default function MainHeader({ count, openModal }) {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src='../src/assets/logo.jpg' alt='Reactfood logo' />
        <h1>Reactfood</h1>
      </div>
      <div>
        <button id='cart-btn' onClick={openModal}>
          Cart <span>({count || 0})</span>
        </button>
      </div>
    </header>
  );
}
