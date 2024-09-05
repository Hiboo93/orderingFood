import React, { useEffect, useState } from 'react'
import { products } from '../../product';
import { Card } from '../card/Card.jsx';


const Food = ({ isCartVisible }) => {
  const fromLocalStorage = JSON.parse(localStorage.getItem('products')) || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  const [cartItems, setCartItems] = useState(fromLocalStorage);

  // Function to limit the size of localStorage
  const cleanLocalStorage = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('products'));
      if (storedCart) {
        // Only keep the cart if it contains products with quantities greater than 0
        const cleanedCart = Object.keys(storedCart)
          .filter(id => storedCart[id] > 0)
          .reduce((obj, id) => {
            obj[id] = storedCart[id];
            return obj;
          }, {});

        // Save cleaned cart back to localStorage
        localStorage.setItem('products', JSON.stringify(cleanedCart));
      }
    } catch (e) {
      // Reset the localStorage if parsing fails
      localStorage.setItem('products', JSON.stringify({}));
    }
  };

  // On component mount, clean localStorage to avoid overflow
  useEffect(() => {
    cleanLocalStorage();
  }, []);

  // Sync cartItems with localStorage only if there are significant changes
  useEffect(() => {
    if (cartItems) {
      try {
        const currentSize = new Blob([JSON.stringify(cartItems)]).size;
        const maxSize = 5000; // Set an arbitrary size limit (in bytes)
        if (currentSize < maxSize) {
          localStorage.setItem('products', JSON.stringify(cartItems));
        } else {
          alert("Storage limit reached! Reducing data saved in localStorage.");
          cleanLocalStorage();
        }
      } catch (e) {
        console.error("Error saving to localStorage: ", e);
      }
    }
  }, [cartItems]);

  // Function to add an item to the cart
  function addToCart(id) {
    setCartItems(cartItems => ({ ...cartItems, [id]: cartItems[id] + 1 }));
  }

  // Function to remove an item from the cart
  function removeFromCart(id) {
    setCartItems(cartItems => ({ ...cartItems, [id]: 0 }));
  }

  // Calculate total amount for cart
  function getTotalAmount() {
    let totalAmount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let itemInfo = products.find(product => product.id === Number(key));
        if (itemInfo) {
          totalAmount += Math.floor(cartItems[key] * itemInfo.price);
        }
      }
    }
    return totalAmount;
  }

  return (
    <div className='my-12 max-w-[1600px] place-items-center lg:mx-auto flex flex-col gap-12 ' id='food'>
      {
        isCartVisible && (
          <div className='z-10 fixed p-4 right-0 top-[80px] bg-primary-color w-96 h-screen overflow-y-scroll'>
            <p className='text-2xl font-bold'>Your order: $ {getTotalAmount()}</p>
            {
              products.map((product) => {
                if (cartItems[product.id] !== 0) {
                  return <div
                  key={product.id}
                  className="glass my-3 grid grid-cols-5 overflow-hidden"
                >
                  <img
                    className="rounded-lg w-[100px] h-[100px] object-cover col-span-2"
                    src={product.productImage}
                  />
                  <div>
                    <p className="text-xl font-bold pl-2">{cartItems[product.id]} x</p>
                    <p className="product-details flex items-center space-x-4 italic">
                      {product.productName} x
                    </p>
                    <p>${product.price} x</p>
                  </div>
            
                  <div className="absolute right-0 bottom-0 gap-2 font-bold">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-600 bg-red-300 hover:bg-red-600 hover:text-red-100 p-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                }
              })
            }
          </div>
        )
      }

      <h2 className='text-3xl p-4 w-full text-start'>Food</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-6'>
        {
          products.map((product) => (
            <div key={product.id}>
              <Card product={product} cartItems={cartItems} addToCart={addToCart}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Food
