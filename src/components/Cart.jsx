import { useContext } from 'react';
//? useContext allows us to use CatContext in any component to access the Context's value
import { CartContext } from '../store/shopping-cart-context.jsx';
// export default function Cart({items, onUpdateItemQuantity }) { //?Since there isn't no need for items since we have use Context
export default function Cart() {
  // const cartCtx = useContext(CartContext); //* Or we can just destructure it
  const {items, updateItemQuantity} = useContext(CartContext)

  //?We will calculate the total price of the items in the cart
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;


  //?Then we will replace all the items with cartCtx.items

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
