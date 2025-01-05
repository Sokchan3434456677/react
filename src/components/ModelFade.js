// // src/components/CartModal.js
// import React from 'react';
// import { useCart } from './CartContext';

// function CartModal() {
//   const { cart, removeFromCart } = useCart(); // Access cart and remove function

//   if (cart.length === 0) {
//     return <div>Your cart is empty.</div>;
//   }

//   return (
//     <div className="modal fade" id="modallong" tabIndex={-1} aria-labelledby="modallongLabel" aria-hidden="true">
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="modallongLabel">Your Cart</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index} className="cart-item">
//                   <span>{item.title} - ${item.price} x {item.quantity}</span>
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="btn btn-danger btn-sm ms-2"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary">Checkout</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartModal;


// import React, { useEffect, useState } from 'react';
// import { useCart } from './CartContext';

// function CartModal() {
//   const { cart, removeFromCart } = useCart(); // Access cart and remove function
//   const [paypalLoaded, setPaypalLoaded] = useState(false); // Track PayPal SDK loading

//   // Load PayPal script dynamically (using the sandbox environment for testing)
//   useEffect(() => {
//     if (!window.paypal) {
//       const script = document.createElement("script");
//       script.src = "https://www.paypal.com/sdk/js?client-id=AUyvPGJd46FRotwjm6wU6WSah8fygyFnjF9VHn75tuK9EUW7SimKn4WnGVz9gQbDjxkhBMwtN8EY5pJn";
//       script.async = true;
//       script.onload = () => {
//         setPaypalLoaded(true); // Update state when PayPal script is loaded
//       };
//       document.body.appendChild(script);
//     } else {
//       setPaypalLoaded(true); // If PayPal is already loaded
//     }
//   }, []);

//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleCheckout = () => {
//     if (paypalLoaded && window.paypal) {
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: totalAmount.toFixed(2), // Total amount in USD
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: (data, actions) => {
//           return actions.order.capture().then((details) => {
//             alert("Payment Successful! Thank you, " + details.payer.name.given_name);
//             // Optionally, clear the cart here
//           });
//         },
//         onError: (err) => {
//           console.error("PayPal Error:", err);
//         },
//       }).render("#paypal-button-container"); // Render PayPal button inside a container
//     }
//   };

//   if (cart.length === 0) {
//     return <div>Your cart is empty.</div>;
//   }

//   return (
//     <div className="modal fade" id="modallong" tabIndex={-1} aria-labelledby="modallongLabel" aria-hidden="true">
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="modallongLabel">Your Cart</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index} className="cart-item">
//                   <span>{item.title} - ${item.price} x {item.quantity}</span>
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="btn btn-danger btn-sm ms-2"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="d-flex justify-content-between">
//               <span><strong>Total:</strong> ${totalAmount.toFixed(2)}</span>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             {/* Only show the "Checkout" button if PayPal script is loaded */}
//             {paypalLoaded ? (
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleCheckout}
//               >
//                 Checkout with PayPal
//               </button>
//             ) : (
//               <div>Loading PayPal...</div>
//             )}
//             {/* Placeholder for the PayPal Button */}
//             <div id="paypal-button-container"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartModal;







import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';

function CartModal() {
  const { cart, removeFromCart } = useCart(); // Access cart and remove function
  const [paypalLoaded, setPaypalLoaded] = useState(false); // Track PayPal SDK loading

  // Load PayPal script dynamically (using the sandbox environment for testing)
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AUyvPGJd46FRotwjm6wU6WSah8fygyFnjF9VHn75tuK9EUW7SimKn4WnGVz9gQbDjxkhBMwtN8EY5pJn";
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true); // Update state when PayPal script is loaded
      };
      document.body.appendChild(script);
    } else {
      setPaypalLoaded(true); // If PayPal is already loaded
    }
  }, []);

  // Calculate the total amount (with price and quantity)
  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  const handleCheckout = () => {
    if (paypalLoaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount.toFixed(2), // Total amount in USD
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment Successful! Thank you, " + details.payer.name.given_name);
            // Optionally, clear the cart here
          });
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
        },
      }).render("#paypal-button-container"); // Render PayPal button inside a container
    }
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="modal fade" id="modallong" tabIndex={-1} aria-labelledby="modallongLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modallongLabel">Your Cart</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <span>
                    {item.title} - ${item.price} x {item.quantity}
                    <br />
                    <small>Chapter: {item.chapterName}</small> {/* Display the chapter name */}
                  </span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <span><strong>Total:</strong> ${totalAmount.toFixed(2)}</span> {/* Display the total amount */}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            {/* Only show the "Checkout" button if PayPal script is loaded */}
            {paypalLoaded ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Checkout with PayPal
              </button>
            ) : (
              <div>Loading PayPal...</div>
            )}
            {/* Placeholder for the PayPal Button */}
            <div id="paypal-button-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;

