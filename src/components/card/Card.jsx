import React from "react";
import { BsStarHalf, BsStarFill, BsCart } from 'react-icons/bs';

export const Card = ({ product, cartItems, addToCart }) => {
  return (
    <div key={product.id} className='w-[380px] p-5 bg-white rounded-lg glass transition-all duration-200 hover:scale-110'>
              <img className='rounded-lg w-[400px] h-[220px] object-cover' src={product.productImage} alt='img'/>
              <div className='flex flex-row justify-between items-center mt-5 gap-3'>
                <h2 className='font-semibold text-xl'>{product.productName}</h2>
                <div className='flex'>
                  <BsStarFill className='text-brightColor'/>
                  <BsStarFill className='text-brightColor'/>
                  <BsStarFill className='text-brightColor'/>
                  <BsStarFill className='text-brightColor'/>
                  <BsStarHalf className='text-brightColor'/>
                </div>
                <h3 className='font-semibold text-lg'>${product.price}</h3>
                <button onClick={() => {addToCart(product.id)}} className='p-3 text-2xl w-14 rounded-xl bg-orange-400 hover:bg-orange-800'><BsCart className='mx-auto'/></button>
                {
                  cartItems[product.id] > 0 && <div className='absolute flex items-center justify-center top-5 left-5 bg-green-600 font-bold rounded-lg h-12 w-12'>{cartItems[product.id]}</div>
                }
              </div>
            </div>
  );
};
