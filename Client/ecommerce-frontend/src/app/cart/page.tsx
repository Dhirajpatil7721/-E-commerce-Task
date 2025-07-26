'use client'
import { useState } from 'react';
import { Product } from '@/app/types';
import Headers from '@/app/components/Header';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <div>
      <Headers/>
      <h1>Your Cart</h1>
      {cart.map((p, index) => (
        <div key={index}>
          <h3>{p.name} - ₹{p.price}</h3>
        </div>
      ))}
    </div>
  );
}
